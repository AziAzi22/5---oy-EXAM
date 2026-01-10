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
const superAdmin = require("../middleware/superadmin");
const upload = require("../utils/multer");
const checkAdmin = require("../middleware/check-admin");
const authorization = require("../middleware/authorization");

const BrandRouter = Router();

BrandRouter.get("/get_all_brands", authorization, getAllBrands);
BrandRouter.get("/get_all_brands_name", authorization, getAllBrandsName);
BrandRouter.get("/get_one_brand/:id", authorization, getOneBrand);
BrandRouter.post(
  "/add_brand",
  checkAdmin,
  upload.single("photo_of_brand"),
  brandValidationMiddleware,
  addBrand
);
BrandRouter.patch("/update_brand/:id", checkAdmin, updateBrand);
BrandRouter.delete("/delete_brand/:id", superAdmin, deleteBrand);

module.exports = BrandRouter;
