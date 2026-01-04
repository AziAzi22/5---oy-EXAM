const { Router } = require("express");
const { getAllCars, getOneCar, addCar, updateCar, deleteCar } = require("../controller/car.controller");

const CarRouter = Router();

CarRouter.get("/get_all_cars", getAllCars);
CarRouter.get("/get_one/:id", getOneCar);
CarRouter.post("/add_brand", addCar);
CarRouter.put("/update_brand/:id", updateCar);
CarRouter.delete("/delete_brand/:id", deleteCar);

module.exports = CarRouter;
