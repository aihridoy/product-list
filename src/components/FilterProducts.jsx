/* eslint-disable react/prop-types */
import FilterSvg from './FilterSvg';

const FilterProducts = ({ toggleFilter, isFilterOpen, loadingCategories, categories, filterProducts, selectedCategory, categoryError }) => {
    return (
        <div className="relative inline-block text-left">
            <button type="button"
                onClick={toggleFilter}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all">
                Filter
                <FilterSvg />
            </button>
            {isFilterOpen && (
                <div className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg">
                    {!loadingCategories && categories.map((category) => (
                        <span key={category} onClick={() => filterProducts(category)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                            <label className={`inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm ${selectedCategory === category ? 'bg-gray-100' : 'text-gray-700'}`}>
                                <input type="checkbox" className="form-checkbox h-4 w-4" checked={selectedCategory === category} readOnly />
                                <span className="ml-2">{category}</span>
                            </label>
                        </span>
                    ))}
                    {loadingCategories && <span className="block px-4 py-2 text-sm text-gray-500">Loading...</span>}
                    {categoryError && <span className="block px-4 py-2 text-sm text-red-500">{categoryError}</span>}
                </div>
            )}
        </div>
    );
};

export default FilterProducts;