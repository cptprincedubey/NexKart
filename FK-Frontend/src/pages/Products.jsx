import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/products", { withCredentials: true });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Products</h2>
          <Link
            to="/create-product"
            className="w-full sm:w-auto bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 font-semibold transition text-center text-sm sm:text-base"
          >
            Add New Product
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
            <p className="text-gray-600 text-base sm:text-lg mb-4">No products found yet.</p>
            <Link
              to="/create-product"
              className="bg-indigo-600 text-white px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 font-semibold transition inline-block text-sm sm:text-base"
            >
              Create Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((prod) => (
              <div
                key={prod._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <div className="p-4 sm:p-5 grow flex flex-col">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-2 mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3 grow">
                    {prod.description}
                  </p>
                  <div className="mb-4">
                    <p className="font-semibold text-lg sm:text-xl text-indigo-600">
                      {prod.price.currency} {prod.price.amount}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/update-product/${prod._id}`}
                  className="block bg-indigo-600 text-white py-2 sm:py-3 text-center hover:bg-indigo-700 font-semibold transition text-sm sm:text-base"
                >
                  Edit Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
