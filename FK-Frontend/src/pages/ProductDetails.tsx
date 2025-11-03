import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

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

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {product.images && product.images.length > 0 && (
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-80 object-cover rounded-md"
        />
      )}

      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-indigo-600 font-bold mt-4 text-xl">
        {product.price.currency} {product.price.amount}
      </p>
    </div>
  );
};

export default ProductDetails;
