const { Schema, model } = require("mongoose");

const SavedCars = new Schema(
  {
    user_id: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true,
    },
    car_id: {
      type: Schema.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SavedCars.index({ user_id: 1, car_id: 1 }, { unique: true });

module.exports = model("Saved_Cars", SavedCars);
