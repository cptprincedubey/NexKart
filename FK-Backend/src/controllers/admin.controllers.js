const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");

const getAllUsersController = async (req, res) => {
  try {
    let allUsers = await UserModel.find({});

    if (!allUsers)
      return res.status(400).json({
        message: "Something went wrong, users not found",
      });

    return res.status(200).json({
      message: "Users fetched",
      users: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    let allProducts = await ProductModel.find({});

    if (!allProducts)
      return res.status(400).json({
        message: "Something went wrong, products not found",
      });

    return res.status(200).json({
      message: "All products fetched",
      products: allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    let product_id = await req.params.product_id;

    if (!product_id)
      return res.status(404).json({
        message: "Product id not found",
      });

    const delProduct = await ProductModel.findByIdAndDelete(product_id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("error in Delete products", error);
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

module.exports = {
  getAllProductsController,
  getAllUsersController,
  deleteProductController,
};









