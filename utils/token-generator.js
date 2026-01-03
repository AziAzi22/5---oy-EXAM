const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("./custom-error-handler");

// access token
const accessToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });
  } catch (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }
};

// refresh token
const refreshToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: "30d" });
  } catch (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }
};

module.exports = {  
  accessToken,
  refreshToken,
};
