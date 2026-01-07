const Joi = require("joi");

// change password

const changePasswordValidator = async (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    current_password: Joi.string().trim().min(8).required(),
    new_password: Joi.string().trim().min(8).required(),
    confirm_password: Joi.string().trim().min(8).required(),
  }).validate(data, { abortEarly: false });

// vchange username

const changeUsernameValidator = async (data) =>
  Joi.object({
    username: Joi.string().trim().alphanum().min(3).max(30).required(),
  }).validate(data, { abortEarly: false });

// change birth year

const changeBirthYearValidator = async (data) =>
  Joi.object({
    birth_year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
  }).validate(data, { abortEarly: false });

// change email

const changeEmailValidator = async (data) =>
  Joi.object({
    new_email: Joi.string().email().required(),
    old_password: Joi.string().trim().min(8).required(),
    new_password: Joi.string().trim().min(8).required(),
    confirm_password: Joi.string().trim().min(8).required(),
  }).validate(data, { abortEarly: false });

module.exports = {
  changePasswordValidator,
  changeUsernameValidator,
  changeBirthYearValidator,
  changeEmailValidator,
};
