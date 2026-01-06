const AuthSchema = require("../schema/auth.schema");
const logger = require("../utils/logger");

// get my profile

const getProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    logger.error("get profile error", error.message);

    next(error);
  }
};

// update my username

const changeUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { id } = req.user;

    if (!username) {
      throw CustomErrorHandler.BadRequest("username is required");
    }

    await AuthSchema.findByIdAndUpdate(id, { username });

    res.status(200).json({
      message: "username updated",
    });
  } catch (error) {
    logger.error("change username error", error.message);

    next(error);
  }
};

// update my birth year

const changeBirthYear = async (req, res, next) => {
  try {
    const { birth_year } = req.body;
    const { id } = req.user;

    if (!birth_year) {
      throw CustomErrorHandler.BadRequest("birth_year is required");
    }

    await AuthSchema.findByIdAndUpdate(id, { birth_year });

    res.status(200).json({
      message: "birth_year updated",
    });
  } catch (error) {
    logger.error("change birth year error", error.message);

    next(error);
  }
};

// add picture

const addPicture = async (req, res, next) => {
  try {
    const {picture} = req.file;
    
    if (!picture) {
      throw CustomErrorHandler.BadRequest("picture is required");
    }

    await AuthSchema.findByIdAndUpdate(id, { picture });

    res.status(200).json({
      message: "picture added",
    });
  } catch (error) {
    logger.error("add picture error", error.message);

    next(error);
  }
};

module.exports = {
  getProfile,
  changeUsername,
  changeBirthYear,
};
