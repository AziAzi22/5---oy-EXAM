const AuthSchema = require("../schema/auth.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");

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

// change picture

const changePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      throw CustomErrorHandler.BadRequest("picture is required");
    }

    const picture = `/images/${req.file.filename}`;
    "/images/default_photo_for_profile.png"

    const id = req.user.id;

    await AuthSchema.findByIdAndUpdate(id, { picture: picture });

    res.status(200).json({
      message: "picture updated",
    });
  } catch (error) {
    logger.error("change picture error", error.message);

    next(error);
  }
};

// change password

const changePassword = async (req, res, next) => {
  try {
    const { email, current_password, new_password, confirm_password } =
      req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    if (current_password === new_password) {
      throw CustomErrorHandler.BadRequest(
        "new password and current password must be different"
      );
    }

    if (confirm_password !== new_password) {
      throw CustomErrorHandler.BadRequest(
        "new password and confirm password must be same"
      );
    }

    const compare = await bcrypt.compare(
      current_password,
      foundedUser.password
    );

    if (compare) {
      if (req.user.email !== foundedUser.email) {
        logger.warn(`Change password attempt with wrong email: ${email}`);

        throw CustomErrorHandler.Forbidden(
          "you can only change your own password"
        );
      }
      const hash = await bcrypt.hash(new_password, 14);

      await AuthSchema.findByIdAndUpdate(foundedUser._id, {
        password: hash,
      });

      return res.status(200).json({ message: "password changed" });
    } else {
      logger.warn(`Change password attempt with wrong password: ${email}`);

      throw CustomErrorHandler.UnAuthorized("Invalid password");
    }
  } catch (error) {
    logger.error("change password error", error.message);

    next(error);
  }
};

// change email

const changeEmail = async (req, res, next) => {
  try {
    const { new_email, old_password, new_password, confirm_password } =
      req.body;

    const { email: currentEmail, id } = req.user;

    const emailExists = await AuthSchema.findOne({ email: new_email });
    const foundedUser = await AuthSchema.findById(id).select("+password");

    if (emailExists) {
      throw CustomErrorHandler.BadRequest("email already exists");
    }

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    if (old_password === new_password) {
      throw CustomErrorHandler.BadRequest(
        "new password and current password must be different"
      );
    }

    if (confirm_password !== new_password) {
      throw CustomErrorHandler.BadRequest(
        "new password and confirm password must be same"
      );
    }

    const decode = await bcrypt.compare(old_password, foundedUser.password);

    if (!decode) {
      logger.warn(`Change email attempt with wrong password: ${currentEmail}`);

      throw CustomErrorHandler.UnAuthorized("Invalid password");
    }

    const hash = await bcrypt.hash(new_password, 14);

    foundedUser.email = new_email;
    foundedUser.password = hash;
    foundedUser.isVerified = false;

    await foundedUser.save();

    logger.info(`Email changed from ${currentEmail} to ${new_email}`);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({
      message: "email changed please verify your new email",
    });
  } catch (error) {
    logger.error("change email error", error.message);
    next(error);
  }
};

module.exports = {
  getProfile,
  changeUsername,
  changeBirthYear,
  changePicture,
  changePassword,
  changeEmail,
};
