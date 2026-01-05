const Joi = require("joi");

exports.CarValidator = function (data) {
  const schema = Joi.object({
    model: Joi.string()
      .trim()
      .min(2)
      .max(80)
      .pattern(/^[A-Za-z0-9\s-]+$/)
      .required(),
    engine: Joi.string().trim().min(5).max(40).required(),
    color: Joi.string()
      .trim()
      .lowercase()
      .valid([
        "black",
        "white",
        "red",
        "blue",
        "green",
        "yellow",
        "gray",
        "brown",
        "orange",
        "purple",
        "pink",
        "silver",
      ])
      .required(),
    gearbox: Joi.string()
      .trim()
      .lowercase()
      .valid(["manual", "automatic", "robot", "cvt"])
      .required(),
    window_tint: Joi.boolean().default(false).required(),
    year: Joi.number()
      .integer()
      .max(new Date().getFullYear())
      .min(1900)
      .required(),
    distance: Joi.number().min(0).required(),
    price: Joi.number().min(1).required(),
    description: Joi.string().trim().min(5).max(5000).required(),
  });

  return schema.validate(data, { abortEarly: false });
};
