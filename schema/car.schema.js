const { Schema, model } = require("mongoose");

const Car = new Schema(
  {
    brand_id: {
      type: Schema.ObjectId,
      ref: "Brand",
      required: true,
    },
    model: {
      type: String,
      set: (name) => name.trim(),
      minlength: 2,
      maxlength: 80,
      required: true,
    },
    engine: {
      type: String,
      set: (name) => name.trim(),
      minlength: 5,
      maxLength: 40,
      required: true,
    },
    color: {
      type: String,
      set: (name) => name.trim().toLowerCase(),
      enum: [
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
      ],
      required: true,
    },
    gearbox: {
      type: String,
      set: (name) => name.trim().toLowerCase(),
      enum: ["manual", "automatic", "robot", "cvt"],
      required: true,
    },
    window_tint: {
      type: Boolean,
      default: false,
    },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
      required: true,
    },
    distance: {
      type: Number,
      min: 0,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    photo_of_car: {
      type: String,
      required: true,
    },
    photo_of_inside: {
      type: String,
      required: true,
    },
    photo_of_outside: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      set: (name) => name.trim(),
      minlength: 5,
      maxLength: 5000,
      required: true,
    },
    admin_id: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CarSchema = model("Car", Car);

module.exports = CarSchema;
