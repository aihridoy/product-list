/* eslint-disable react/prop-types */
import SortSvg from './SortSvg';

const SortProducts = ({ toggleSort, isSortOpen, sortProducts }) => {
    return (
        <div className="relative inline-block text-left">
            <button type="button"
                onClick={toggleSort}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
                id="menu-button" aria-expanded="true" aria-haspopup="true">
                Sort
                <SortSvg />
            </button>
            {
                isSortOpen &&
                <div
                    className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <span
                            onClick={() => sortProducts('asc')}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                            Low to High
                        </span>
                        <span
                            onClick={() => sortProducts('desc')}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                            High to Low
                        </span>
                    </div>
                </div>
            }
        </div>
    );
};

export default SortProducts;