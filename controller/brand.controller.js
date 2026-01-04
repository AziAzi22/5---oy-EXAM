const BrandSchema = require("../schema/brand.schema");
const CarSchema = require("../schema/car.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

// get all brands

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandSchema.find();

    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

/// get all brands name

const getAllBrandsName = async (req, res, next) => {
  try {
    const brands = await BrandSchema.find().select("_id name");

    res.status(200).json(brands);
  } catch (error) {
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
    next(error);
  }
}

// add new car brand

const addBrand = async (req, res, next) => {
  try {
    const { name, photo_of_brand} = req.body;

    const admin_id = req.user.id;

    await AuthorSchema.create({
      name,
      photo_of_brand,
      admin_id: admin_id,
    });

    res.status(201).json({
      message: "Added new Brand",
    });
  } catch (error) {
    next(error);
  }
};

/// get one

const getOneBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await AuthorSchema.findById(id)

    if (!brand) {
      throw CustomErrorHandler.NotFound("Brand not found");
    }

    const cars = await CarSchema.find({ brand_id: id });

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

// update brand

async function updateBrand(req, res, next) {
  try {
    const { id } = req.params;
    const Brand = await BrandSchema.findById(id);

    if (!Brand) {
      throw CustomErrorHandler.NotFound("Brand not found");
    }

    const {
        name,
        photo_of_brand
    } = req.body;

    await BrandSchema.findByIdAndUpdate(id, {
      name,
      photo_of_brand
    });

    res.status(200).json({
      message: "Brand updated",
    });
  } catch (error) {
    next(error);
  }
}

// delete

async function deleteBrand(req, res, next) {
  try {
    const { id } = req.params;
    const Brand = await BrandSchema.findById(id);

    if (!Brand) {
      throw CustomErrorHandler.NotFound("Brand not found");
    }

    // if (req.user.role !== "Super Admin") {
    //   throw CustomErrorHandler.Forbidden("You are not a Super Admin");
    // }

    await CarSchema.deleteMany({ brand_id: id });

    await BrandSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Brand deleted",
    });
  } catch (error) {
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
