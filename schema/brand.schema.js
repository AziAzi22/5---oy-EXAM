const { Schema, model } = require("mongoose");

const Brand = new Schema(
  {
    name: {
      type: String,
      set: (name) => name.trim(),
      unique: true,
      minlength: 2,
      maxLength: 80,
      required: true,
    },
    photo_of_brand: {
      type: String,
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

const BrandSchema = model("Brand", Brand);

module.exports = BrandSchema;
