/* eslint-disable react/prop-types */
import SearchSvg from './SearchSvg';

const SearchProduct = ({ setSearchQuery }) => {
    return (
        <div className="flex flex-1 items-center px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:ring-2 ring-inset focus-within:ring-teal-500 rounded-md">
            <SearchSvg />
            <input
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none"
                placeholder="Find anything..." type="text" />
        </div>
    );
};

export default SearchProduct;