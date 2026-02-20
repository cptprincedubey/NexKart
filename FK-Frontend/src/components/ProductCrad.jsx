import React from "react";

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="p-4 sm:p-5 space-y-3 grow flex flex-col">
      <h2 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-2">
        {product.title || product.name}
      </h2>
      <p className="text-gray-600 text-sm line-clamp-2 grow">
        {product.description}
      </p>
      <div className="pt-2 border-t border-gray-200">
        <p className="font-semibold text-lg sm:text-xl text-indigo-600 mb-3">
          {product.price?.currency || "₹"} {product.price?.amount || product.price}
        </p>
        {onEdit && (
          <button
            onClick={() => onEdit(product._id)}
            className="w-full bg-yellow-500 text-white px-3 py-2 sm:py-3 rounded-lg hover:bg-yellow-600 transition font-semibold text-sm sm:text-base"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
