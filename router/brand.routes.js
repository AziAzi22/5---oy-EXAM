const { Router } = require("express");
const {
  getAllBrands,
  getAllBrandsName,
  getOneBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} = require("../controller/brand.controller");
const brandValidationMiddleware = require("../middleware/brand-validation.middleware");
const authorization = require("../middleware/authorization");
const superAdmin = require("../middleware/superadmin");

const BrandRouter = Router();

BrandRouter.get("/get_all_brands", getAllBrands);
BrandRouter.get("/get_all_brands_name", getAllBrandsName);
BrandRouter.get("/get_one_brand/:id", getOneBrand);
BrandRouter.post(
  "/add_brand",
  authorization,
  brandValidationMiddleware,
  addBrand
);
BrandRouter.put("/update_brand/:id", authorization, updateBrand);
BrandRouter.delete("/delete_brand/:id", superAdmin, deleteBrand);

module.exports = BrandRouter;
