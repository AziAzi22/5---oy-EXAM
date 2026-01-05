const { Router } = require("express");
const {
  getAllCars,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
} = require("../controller/car.controller");
const carValidationMiddleware = require("../middleware/car-validation.middleware");
const authorization = require("../middleware/authorization");
const upload = require("../utils/multer");

const CarRouter = Router();

CarRouter.get("/get_all_cars", getAllCars);
CarRouter.get("/get_one/:id", getOneCar);
CarRouter.post(
  "/add_car",
  authorization,
  carValidationMiddleware,
  upload.fields([
    { name: "photo_of_car", maxCount: 1 },
    { name: "photo_of_inside", maxCount: 1 },
    { name: "photo_of_outside", maxCount: 1 },
  ]),
  addCar
);
CarRouter.put("/update_car/:id", authorization, updateCar);
CarRouter.delete("/delete_car/:id", authorization, deleteCar);

module.exports = CarRouter;
