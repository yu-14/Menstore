import React, { useState, useContext, useEffect } from "react";
import ProductCard from "../../Components/ProductCard";
import all_productList from "/public/assets/ProductsList";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";

const Brands = () => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(all_productList);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const uniqueBrands = ["All", ...new Set(all_productList.map((product) => product.brand))];

  useEffect(() => {
    let filtered = all_productList;

    if (selectedBrand !== "All") {
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedBrand, search]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div
      className={`p-6 lg:p-10 min-h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="font-semibold text-3xl lg:text-4xl mb-6 text-center">Products by Brand</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
        >
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Product Grid */}
      {currentProducts.length === 0 ? (
        <p className="text-center text-orange-500 text-lg mt-4">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              key={product.id}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center mt-6">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold">{indexOfFirstProduct + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(indexOfLastProduct, filteredProducts.length)}
            </span>{" "}
            of <span className="font-semibold">{filteredProducts.length}</span> Products
          </span>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
