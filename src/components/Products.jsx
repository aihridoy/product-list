import { useEffect, useState } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import useFetchCategories from "../hooks/useFetchCategories";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import SearchProduct from "./SearchProduct";
import SortProducts from "./SortProducts";
import FilterProducts from "./FilterProducts";
import SkeletonProduct from "./SkeletonProduct";

const BASE_URL = "https://fakestoreapi.com/products";
const PRODUCTS_PER_PAGE = 12;

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const productUrl = selectedCategory
        ? `${BASE_URL}/category/${selectedCategory}`
        : BASE_URL;

    const { products, loading, error, setProducts } = useFetchProducts(productUrl);
    const {
        categories,
        loading: loadingCategories,
        error: categoryError,
    } = useFetchCategories(`${BASE_URL}/categories`);

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const toggleSort = () => setIsSortOpen(!isSortOpen);
    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    const sortProducts = (order) => {
        const sortedProducts = [...products].sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price)
        setProducts(sortedProducts)
        setIsSortOpen(false);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 800);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const filterProducts = (category) => {
        setSelectedCategory(selectedCategory === category ? "" : category);
        setIsFilterOpen(false);
        setCurrentPage(1);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <div className="pt-16 sm:pt-24 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
                        New Arrivals
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 text-center">
                        Thoughtfully designed objects for the workspace, home, and travel.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="flex justify-between relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="w-full">
                            <SortProducts
                                toggleSort={toggleSort}
                                isSortOpen={isSortOpen}
                                sortProducts={sortProducts}
                            />
                            <FilterProducts
                                toggleFilter={toggleFilter}
                                isFilterOpen={isFilterOpen}
                                loadingCategories={loadingCategories}
                                categories={categories}
                                filterProducts={filterProducts}
                                selectedCategory={selectedCategory}
                                categoryError={categoryError}
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <SearchProduct setSearchQuery={setSearchQuery} />
                            <Cart />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-red-500 text-lg">{error}</p>
                    </div>
                )}

                <div>
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {loading
                                    ? Array.from({ length: 8 }).map((_, index) => (
                                        !error && <SkeletonProduct key={index} />
                                    ))
                                    : paginatedProducts.length > 0 ?
                                        (
                                            paginatedProducts.map((product) => (
                                                <SingleProduct key={product.id} product={product} />
                                            ))
                                        )
                                        :
                                        (
                                            <p className="col-span-full text-center text-gray-500">
                                                No products found
                                            </p>
                                        )}
                            </div>
                            <div className="flex justify-center items-center mt-6">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
