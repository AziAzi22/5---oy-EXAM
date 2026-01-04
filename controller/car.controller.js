const BrandSchema = require("../schema/brand.schema");
const CarSchema = require("../schema/car.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

// get all cars

const getAllCars = async (req, res, next) => {
  try {
    const cars = await CarSchema.find();

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

/// search

async function search(req, res, next) {
  try {
    const { name } = req.query;

    const searchingResult = await CarSchema.find({
      full_name: {
        $regex: name,
        $options: "i",
      },
    });

    res.status(200).json(searchingResult);
  } catch (error) {
    next(error);
  }
}

// add new car

const addCar = async (req, res, next) => {
  try {
    const {
      brand_id,
      model,
      engine,
      color,
      gearbox,
      window_tint,
      year,
      distance,
      price,
      photo_of_car,
      photo_of_inside,
      photo_of_outside,
      description,
    } = req.body;

    const admin_id = req.user.id;

    await CarSchema.create({
      brand_id,
      model,
      engine,
      color,
      gearbox,
      window_tint,
      year,
      distance,
      price,
      photo_of_car,
      photo_of_inside,
      photo_of_outside,
      description,
      admin_id: admin_id,
    });

    res.status(201).json({
      message: "Added new Car",
    });
  } catch (error) {
    next(error);
  }
};

/// get one car

const getOneCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Car = await CarSchema.findById(id);

    if (!Car) {
      throw CustomErrorHandler.NotFound("Car not found");
    }

    res.status(200).json(Car);
  } catch (error) {
    next(error);
  }
};

// update car

async function updateCar(req, res, next) {
  try {
    const { id } = req.params;
    const Car = await CarSchema.findById(id);

    if (!Car) {
      throw CustomErrorHandler.NotFound("Car not found");
    }

    const {
      brand_id,
      model,
      engine,
      color,
      gearbox,
      window_tint,
      year,
      distance,
      price,
      photo_of_car,
      photo_of_inside,
      photo_of_outside,
      description,
    } = req.body;

    await CarSchema.findByIdAndUpdate(id, {
      brand_id,
      model,
      engine,
      color,
      gearbox,
      window_tint,
      year,
      distance,
      price,
      photo_of_car,
      photo_of_inside,
      photo_of_outside,
      description,
    });

    res.status(200).json({
      message: "Car updated",
    });
  } catch (error) {
    next(error);
  }
}

// delete car

async function deleteCar(req, res, next) {
  try {
    const { id } = req.params;
    const Car = await CarSchema.findById(id);

    if (!Car) {
      throw CustomErrorHandler.NotFound("Car not found");
    }

    // if (req.user.role !== "Super Admin") {
    //   throw CustomErrorHandler.Forbidden("You are not a Super Admin");
    // }

    await CarSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Car deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCars,
  addCar,
  getOneCar,
  updateCar,
  deleteCar,
  search,
};
