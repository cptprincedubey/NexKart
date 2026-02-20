import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import ProductCard from "../components/ProductCrad";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/admin/products", {
        withCredentials: true, // send cookies for auth
      });
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/admin/delete-product/${productId}`, {
        withCredentials: true,
      });
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">All Products (Admin)</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
            <p className="text-gray-600 text-base sm:text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
                <ProductCard product={product} />
                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-full bg-red-600 text-white py-2 sm:py-3 hover:bg-red-700 font-semibold transition text-sm sm:text-base"
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
