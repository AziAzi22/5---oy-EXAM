const { Schema, model } = require("mongoose");

const SavedCars = new Schema(
  {
    car_id: {
      type: Schema.ObjectId,
      ref: "Car",
      required: true,
    },
    users_id: {
      type: [Schema.ObjectId],
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SavedCarsSchema = model("Saved_Cars", SavedCars);

module.exports = SavedCarsSchema;

