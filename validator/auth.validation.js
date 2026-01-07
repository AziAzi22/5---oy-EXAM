const Joi = require("joi");

// forgot password

const ForgotPasswordValidator = async (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(8).required(),
    otp: Joi.string().trim().required(),
  }).validate(data, { abortEarly: false });

// verify

const VerifyValidator = async (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  }).validate(data, { abortEarly: false });

// resend otp

const ResendOTPValidator = async (data) =>
  Joi.object({
    email: Joi.string().email().required(),
  }).validate(data, { abortEarly: false });

// register

const RegisterValidator = async (data) =>
  Joi.object({
    username: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .pattern(/^[a-zA-Z0-9 ]+$/)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(8).required(),
    birth_year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
  }).validate(data, { abortEarly: false });

// login

const LoginValidator = async (data) =>
  Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().trim().required(),
  }).validate(data, { abortEarly: false });

module.exports = {
  LoginValidator,
  RegisterValidator,
  ResendOTPValidator,
  VerifyValidator,
  ForgotPasswordValidator,
};
