const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");
const { changeEmailValidator, changeBirthYearValidator, changeUsernameValidator, changePasswordValidator, changePictureValidator } = require("../validator/user.validation");

// change email

const changeEmailValidatorMiddleware = async function (req, res, next) {
  const { error } = await changeEmailValidator(req.body);

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

const changeBirthYearValidatorMiddleware = async function (req, res, next) {
  const { error } = await changeBirthYearValidator(req.body);

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

const changeUsernameValidatorMiddleware = async function (req, res, next) {
  const { error } = await changeUsernameValidator(req.body);

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

const changePasswordValidatorMiddleware = async function (req, res, next) {
  const { error } = await changePasswordValidator(req.body);

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
