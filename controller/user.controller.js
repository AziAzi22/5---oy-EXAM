const AuthSchema = require("../schema/auth.schema");

// get my profile

const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

// update my username

const UpdateMyUsername = async (req, res, next) => {
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
    next(error);
  }
};

// update my birth year

const UpdateMyBirthYear = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = {
  getMyProfile,
  UpdateMyUsername,
  UpdateMyBirthYear,
};
