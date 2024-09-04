const jwt = require("jsonwebtoken");
const User = require("../Modules/Auth");
const protecteur = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.REFRECH_KEY);
      req.user = await User.findById(decoded.userInfo.id).select("-password");
      next();
    } catch (error) {
      res.status(404).json({
        message: "Token is not valid",
      });
    }
  } else {
    res.status(403).json({
      message: "You are not authenticated",
    });
  }
};

module.exports = protecteur;
