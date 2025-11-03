const express = require("express");
const jwt = require("jsonwebtoken");
const {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  updatePasswordController,
} = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/forgot-password", forgotPasswordController);

router.get("/reset-password/:token", async (req, res) => {
  let token = req.params.token;

  if (!token)
    return res.status(404).json({
      message: "Token not found",
    });

  let decode = jwt.verify(token, process.env.JWT_RAW_SECRET);

  return res.render("index.ejs", { user_id: decode.id });
});

router.post("/update-password/:id", updatePasswordController);
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;

