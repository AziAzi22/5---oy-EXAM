const SavedCarsSchema = require("../schema/saved-cars.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");
const AuthSchema = require("../schema/auth.schema");

// save car

async function saveCar(req, res, next) {
  try {
    const { id: carId } = req.params;
    const userId = req.user.id;

    const exists = await SavedCarsSchema.findOne({
      car_id: carId,
      user_id: userId,
    });

    if (exists) {
      await SavedCarsSchema.deleteOne({ _id: exists._id });

      return res.status(200).json({
        message: "Car removed from saved",
      });
    }

    await SavedCarsSchema.create({
      car_id: carId,
      user_id: userId,
    });

    logger.info("Car saved", { car_id: carId, user_id: userId });

    res.status(200).json({
      message: "Car saved",
    });
  } catch (error) {
    logger.error("Save car error", error.message);
    next(error);
  }
}

// get saved cars

const getSavedCars = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await AuthSchema.findById(userId);

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    const savedCars = await SavedCarsSchema.find({ user_id: userId }).populate(
      "car_id"
    );

    res.status(200).json(savedCars);
  } catch (error) {
    logger.error("Save car error", error.message);

    next(error);
  }
};

module.exports = { saveCar, getSavedCars };
