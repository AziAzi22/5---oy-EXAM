const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");
const { changeEmailValidator, changeBirthYearValidator, changeUsernameValidator, changePasswordValidator, changePictureValidator } = require("../validator/user.validation");

// change email

const changeEmailValidatorMiddleware = function (req, res, next) {
  const { error } = changeEmailValidator(req.body);

  if (error) {
    // logger.warn("Change email validation failed", {
    //   error: error.message,
    //   body: req.body,
    //   ip: req.ip,
    // });

    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

// change birth year

const changeBirthYearValidatorMiddleware = function (req, res, next) {
  const { error } = changeBirthYearValidator(req.body);

  if (error) {
    // logger.warn("Change birth year validation failed", {
    //   error: error.message,
    //   email: req.body.email,
    //   ip: req.ip,
    // });

    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

// change username

const changeUsernameValidatorMiddleware = function (req, res, next) {
  const { error } = changeUsernameValidator(req.body);

  if (error) {
    // logger.warn("Change username validation failed", {
    //   error: error.message,
    //   email: req.body.email,
    //   ip: req.ip,
    // });

    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

// change password

const changePasswordValidatorMiddleware = function (req, res, next) {
  const { error } = changePasswordValidator(req.body);

  if (error) {
    // logger.warn("Change password validation failed", {
    //   error: error.message,
    //   email: req.body.email,
    //   ip: req.ip,
    // });

    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

module.exports = {
  changeEmailValidatorMiddleware,
  changeBirthYearValidatorMiddleware,
  changeUsernameValidatorMiddleware,
  changePasswordValidatorMiddleware
};
