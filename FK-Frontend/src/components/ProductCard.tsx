import { Link } from "react-router-dom";

interface ProductCardProps {
  _id: string;
  title: string;
  price: { amount: number; currency: string };
  images: string[];
}

const ProductCard = ({ _id, title, price, images }: ProductCardProps) => (
  <Link
    to={`/product/${_id}`}
    className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition"
  >
    <img
      src={images[0]}
      alt={title}
      className="h-40 w-full object-cover rounded-md"
    />
    <h3 className="font-semibold mt-2">{title}</h3>
    <p className="text-indigo-600 font-bold">
      {price.currency} {price.amount}
    </p>
  </Link>
);

export default ProductCard;
