const { Router } = require("express");
const { saveCar, getSavedCars } = require("../controller/saved-cars.controller");
const authorization = require("../middleware/authorization");

saveCarRouter = Router()

saveCarRouter.patch("/save_car/:id", authorization, saveCar)
saveCarRouter.get("/get_saved_cars", authorization, getSavedCars)

module.exports = saveCarRouter