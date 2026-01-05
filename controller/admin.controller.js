const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");

const roleUpgrade = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await AuthSchema.findById(id);

    if (!user) {
      logger.warn("User not found, superadmin:", req.user.id);

      throw CustomErrorHandler.NotFound("User not found");
    }

    user.role = "admin";
    await user.save();

    logger.info("role is upgrade", {
      user: user.id,
      superadmin: req.user.id,
    });

    res.status(200).json({
      message: "user role is upgrade",
    });
  } catch (error) {
    next(error);
  }
};

///  downgrade

const downgrade = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await AuthSchema.findById(id);

    if (!user) {
      logger.warn("User not found, superadmin:", req.user.id);

      throw CustomErrorHandler.NotFound("User not found");
    }

    user.role = "user";
    await user.save();

    logger.info("role is downgrade", {
      user: user.id,
      superadmin: req.user.id,
    });

    res.status(200).json({
      message: "user role is downgrade",
    });
  } catch (error) {
    next(error);
  }
};

/// get all user

const getAllUser = async (req, res, next) => {
  try {
    const users = await AuthSchema.find().select("-password");

    logger.info("get all user, superadmin:", req.user.id);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  roleUpgrade,
  getAllUser,
  downgrade,
};
