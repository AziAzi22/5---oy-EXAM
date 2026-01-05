const Joi = require("joi");

exports.BrandValidator = function (data) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(80)
      .pattern(/^[A-Za-z0-9\s-]+$/)
      .required(),
  });

  return schema.validate(data, { abortEarly: false });
};
