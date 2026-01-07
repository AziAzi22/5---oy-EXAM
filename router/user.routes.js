const { Router } = require("express");
const {
  getProfile,
  changeUsername,
  changeBirthYear,
  changePicture,
  changePassword,
  changeEmail,
} = require("../controller/user.controller");
const authorization = require("../middleware/authorization");
const {
  changeUsernameValidatorMiddleware,
  changeBirthYearValidatorMiddleware,
  changePasswordValidatorMiddleware,
  changeEmailValidatorMiddleware,
} = require("../middleware/user-validation.middleware");
const upload = require("../utils/multer");

const userRouter = Router();

userRouter.get("/get_profile", authorization, getProfile);
userRouter.patch(
  "/change_username",
  authorization,
  changeUsernameValidatorMiddleware,
  changeUsername
);
userRouter.patch(
  "/change_birth_year",
  authorization,
  changeBirthYearValidatorMiddleware,
  changeBirthYear
);
userRouter.patch(
  "/change_picture",
  authorization,
  upload.single("picture"),
  changePicture
);
userRouter.patch(
  "/change_password",
  authorization,
  changePasswordValidatorMiddleware,
  changePassword
);
userRouter.patch(
  "/change_email",
  authorization,
  changeEmailValidatorMiddleware,
  changeEmail
);

module.exports = userRouter;
