const ProductModel = require("../models/product.model");
const sendFilesToStorage = require("../services/storage.service");

const getAllProductsController = async (req, res) => {
  try {
    const allProducts = await ProductModel.find({});

    if (!allProducts)
      return res.status(400).json({
        message: "Something went wrong",
      });

    if (allProducts.length === 0) {
      return res.status(200).json({
        message: "No product found",
      });
    }

    return res.status(200).json({
      message: "Products fetched",
      products: allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
const createProductController = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, description, amount, currency } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    if (!title || !description || !amount || !currency) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const uploadedImgUrl = await Promise.all(
      req.files.map(async (elem) => {
        return await sendFilesToStorage(elem.buffer, elem.originalname);
      })
    );

    const newProduct = await ProductModel.create({
      title,
      description,
      price: {
        amount,
        currency,
      },
      images: uploadedImgUrl.map((elem) => elem.url),
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("Error creating product:", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    let product_id = req.params.product_id;
    let { title, description, amount, currency } = req.body;

    if (!product_id)
      return res.status(404).json({
        message: "Id not found",
      });

    let uploadedImg;

    if (req.files) {
      uploadedImg = await Promise.all(
        req.files.map(async (elem) => {
          return await sendFilesToStorage(elem.buffer, elem.originalname);
        })
      );
    }

    let updatedProduct = await ProductModel.findByIdAndUpdate(
      {
        _id: product_id,
      },
      {
        title,
        description,
        price: {
          amount,
          currency,
        },
        images: uploadedImg.map((elem) => elem.url),
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successsfully",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.log("error in update products", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    let product_id = req.params.product_id;

    if (!product_id)
      return res.status(404).json({
        message: "Id not found",
      });

    let delProduct = await ProductModel.findByIdAndDelete(product_id);

    if (!delProduct)
      return res.status(400).json({
        message: "Error in deleting products",
      });

    return res.status(200).json({
      message: "Product Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
};
