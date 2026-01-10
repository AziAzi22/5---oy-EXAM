const { Router } = require("express");
const {
  getAllCars,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
} = require("../controller/car.controller");
const carValidationMiddleware = require("../middleware/car-validation.middleware");
const upload = require("../utils/multer");
const checkAdmin = require("../middleware/check-admin");
const authorization = require("../middleware/authorization");

const CarRouter = Router();

CarRouter.get("/get_all_cars", authorization, getAllCars);
CarRouter.get("/get_one/:id", authorization, getOneCar);
CarRouter.post(
  "/add_car",
  checkAdmin,
  upload.fields([
    { name: "photo_of_car", maxCount: 1 },
    { name: "photo_of_inside", maxCount: 1 },
    { name: "photo_of_outside", maxCount: 1 },
  ]),
  carValidationMiddleware,
  addCar
);
CarRouter.patch("/update_car/:id", checkAdmin, updateCar);
CarRouter.delete("/delete_car/:id", checkAdmin, deleteCar);

module.exports = CarRouter;
