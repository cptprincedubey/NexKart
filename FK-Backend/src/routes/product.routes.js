const express = require("express");
const {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
} = require("../controllers/products.controllers");
const uploads = require("../config/multer");
const authMiddleware = require("../middlewares/auth.middleware");

let router = express.Router();

router.post("/create",uploads.array("images", 5),authMiddleware,createProductController);



router.put("/update-product/:product_id", uploads.array("images", 5), updateProductController);
router.get("/products", getAllProductsController);
router.delete("/delete/:product_id", authMiddleware, deleteProductController);

module.exports = router;
