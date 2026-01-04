const { Router } = require("express");
const {
  getAllBrands,
  getAllBrandsName,
  getOneBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} = require("../controller/brand.controller");

const BrandRouter = Router();

BrandRouter.get("/get_all_brands", getAllBrands);
BrandRouter.get("/get_all_brands_name", getAllBrandsName);
BrandRouter.get("/get_one/:id", getOneBrand);
BrandRouter.post("/add_brand", addBrand);
BrandRouter.put("/update_brand/:id", updateBrand);
BrandRouter.delete("/delete_brand/:id", deleteBrand);

module.exports = BrandRouter;
