const BrandSchema = require("../schema/brand.schema");
const CarSchema = require("../schema/car.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");

// get all brands

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandSchema.find();

    logger.info("Brands fetched", { count: brands.length });

    res.status(200).json(brands);
  } catch (error) {
    logger.error("Brand fetch error", error.message);
    next(error);
  }
};

/// get all brands name

const getAllBrandsName = async (req, res, next) => {
  try {
    const brands = await BrandSchema.find().select("_id name");

    res.status(200).json(brands);
  } catch (error) {
    logger.error("Brand fetch error", error.message);

    next(error);
  }
};

/// search

async function search(req, res, next) {
  try {
    const { name } = req.query;

    const searchingResult = await BrandSchema.find({
      full_name: {
        $regex: name,
        $options: "i",
      },
    });

    res.status(200).json(searchingResult);
  } catch (error) {
    logger.error("Brand search error", error.message);

    next(error);
  }
}

// add new car brand

const addBrand = async (req, res, next) => {
  try {
    const { name, photo_of_brand } = req.body;

    const admin_id = req.user.id;

    await BrandSchema.create({
      name,
      photo_of_brand,
      admin_id: admin_id,
    });

    logger.info("New Brand added from admin", admin_id);

    res.status(201).json({
      message: "Added new Brand",
    });
  } catch (error) {
    logger.error("Brand add error", error.message);

    next(error);
  }
};

/// get one

const getOneBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await BrandSchema.findById(id);

    if (!brand) {
      logger.warn("Brand not found");

      throw CustomErrorHandler.NotFound("Brand not found");
    }

    const cars = await CarSchema.find({ brand_id: id });

    logger.info("Brand fetched", { count: cars.length });

    res.status(200).json(cars);
  } catch (error) {
    logger.error("Car fetch error", error.message);

    next(error);
  }
};

// update brand

async function updateBrand(req, res, next) {
  try {
    const { id } = req.params;
    const Brand = await BrandSchema.findById(id);

    if (!Brand) {
      logger.warn("Brand not found");

      throw CustomErrorHandler.NotFound("Brand not found");
    }

    const { name, photo_of_brand } = req.body;

    await BrandSchema.findByIdAndUpdate(id, {
      name,
      photo_of_brand,
    });

    logger.info("Brand updated from admin", req.user.id);

    res.status(200).json({
      message: "Brand updated",
    });
  } catch (error) {
    logger.error("Car update error", error.message);

    next(error);
  }
}

// delete

async function deleteBrand(req, res, next) {
  try {
    const { id } = req.params;
    const Brand = await BrandSchema.findById(id);

    if (!Brand) {
      logger.warn("Brand not found");

      throw CustomErrorHandler.NotFound("Brand not found");
    }

    // if (req.user.role !== "Super Admin") {
    //   throw CustomErrorHandler.Forbidden("You are not a Super Admin");
    // }

    await CarSchema.deleteMany({ brand_id: id });

    await BrandSchema.findByIdAndDelete(id);

    logger.info("Brand deleted from admin", req.user.id);

    res.status(200).json({
      message: "Brand deleted",
    });
  } catch (error) {
    logger.error("Car delete error", error.message);

    next(error);
  }
}

module.exports = {
  getAllBrands,
  addBrand,
  getOneBrand,
  updateBrand,
  deleteBrand,
  getAllBrandsName,
  search,
};
