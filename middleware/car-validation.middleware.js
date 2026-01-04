const CustomErrorHandler = require("../utils/custom-error-handler");
const { CarValidator } = require("../validator/car.validation");

module.exports = function (req, res, next) {
  const { error } = CarValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};
