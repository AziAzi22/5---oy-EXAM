const CustomErrorHandler = require("../utils/custom-error-handler");
const { BrandValidator } = require("../validator/brand.validation");

module.exports = function (req, res, next) {
  const { error } = BrandValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};
