const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../utils/custom-error-handler");

const authorization = (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      throw CustomErrorHandler.UnAuthorized("access token not found");
    }

    const decode = jwt.verify(access_token, process.env.SECRET_KEY);
    req.user = decode;

    if (!["admin", "superadmin"].includes(req.user.role)) {
      throw CustomErrorHandler.Forbidden("you are not admin");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
