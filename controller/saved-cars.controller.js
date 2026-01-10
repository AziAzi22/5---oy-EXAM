const SavedCarsSchema = require("../schema/saved-cars.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");
const AuthSchema = require("../schema/auth.schema");

async function saveCar(req, res, next) {
  try {
    const { id: carID } = req.params;
    const userId = req.user.id;

    const user = await AuthSchema.findById(userId);

    if (!user) {
      logger.warn("User not found");

      throw CustomErrorHandler.NotFound("User not found");
    }

    const savedCar = await SavedCarsSchema.findOne({ car_id: carID });

    if (!savedCar) {
      await SavedCarsSchema.create({
        car_id: carID,
        users_id: [userId],
      });

      logger.info("Car saved", { car_id: carID, user_id: userId });

      return res.status(200).json({
        message: "Car saved",
      });
    }

    const isSaved = savedCar.users_id.includes(userId);

    if (isSaved) {
      savedCar.users_id.pull(userId);
      await savedCar.save();

      logger.info("Car unsaved", { car_id: carID, user_id: userId });

      return res.status(200).json({
        message: "Car removed from saved",
      });
    }

    savedCar.users_id.push(userId);
    await savedCar.save();

    logger.info("Car saved", { car_id: id, user_id: user.id });

    res.status(200).json({
      message: "Car saved",
    });
  } catch (error) {
    logger.error("Save car error", error.message);
    next(error);
  }
}

const getSavedCars = async (req, res, next) => {
    try {
        
    } catch (error) {
        logger.error("Save car error", error.message);
        
        next(error);
    }
};

module.exports = { saveCar };
