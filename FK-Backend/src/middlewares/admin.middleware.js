const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const cacheInstance = require("../services/cache.service");

const adminMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token)
      return res.status(404).json({
        message: "Token not found",
      });

    let isBlackListed = cacheInstance.get(token);

    if (!isBlackListed)
      return res.status(404).json({
        message: "Token blacklisted",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    let user = await UserModel.findById(decode.id);
    console.log("user->", user);
    let isAdmin = user.isAdmin;

    if (!isAdmin)
      return res.status(403).json({
        message: "You are not authorized",
      });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in admin middleware", error);
  }
};

module.exports = adminMiddleware;
