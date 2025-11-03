import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";

interface Product {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: {
    amount: number;
    currency: string;
  };
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="p-6 text-center text-gray-600">No products available.</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
};

export default Home;

