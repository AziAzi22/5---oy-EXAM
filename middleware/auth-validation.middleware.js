const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");
const {
  RegisterValidator,
  LoginValidator,
  VerifyValidator,
  ResendOTPValidator,
  ForgotPasswordValidator,
} = require("../validator/auth.validation");

// register

const RegisterValidatorMiddleware = function (req, res, next) {
  const { error } = RegisterValidator(req.body);

  if (error) {
    logger.warn("Register validation failed", {
      error: error.message,
      body: req.body,
      ip: req.ip,
    });
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

// login

const LoginValidatorMiddleware = function (req, res, next) {
  const { error } = LoginValidator(req.body);

  if (error) {
    logger.warn("Login validation failed", {
      error: error.message,
      email: req.body.email,
      ip: req.ip,
    });
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

// verify

const VerifyValidatorMiddleware = function (req, res, next) {
  const { error } = VerifyValidator(req.body);

  if (error) {
    logger.warn("Verify validation failed", {
      error: error.message,
      email: req.body.email,
      ip: req.ip,
    });
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

// vresend otp

const ResendOTPValidatorMiddleware = function (req, res, next) {
  const { error } = ResendOTPValidator(req.body);

  if (error) {
    logger.warn("Resend OTP validation failed", {
      error: error.message,
      email: req.body.email,
      ip: req.ip,
    });
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

// vresend otp

const ForgotPasswordValidatorMiddleware = function (req, res, next) {
  const { error } = ForgotPasswordValidator(req.body);

  if (error) {
    logger.warn("Forgot Password validation failed", {
      error: error.message,
      email: req.body.email,
      ip: req.ip,
    });
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};

module.exports = {
  RegisterValidatorMiddleware,
  LoginValidatorMiddleware,
  VerifyValidatorMiddleware,
  ResendOTPValidatorMiddleware,
  ForgotPasswordValidatorMiddleware,
};
