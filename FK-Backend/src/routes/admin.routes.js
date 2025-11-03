const express = require("express");
const { route } = require("./product.routes");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const { getAllUsersController } = require("../controllers/admin.controllers");
const {
  getAllProductsController,
  deleteProductController,
} = require("../controllers/admin.controllers");

const router = express.Router();

router.get("/users", adminMiddleware, getAllUsersController);
router.get("/products", adminMiddleware, getAllProductsController);
router.delete(
  "/delete-product/:product_id",
  adminMiddleware,
  deleteProductController
);

module.exports = router;
