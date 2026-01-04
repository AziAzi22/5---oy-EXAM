const { Router } = require("express");
const {
  register,
  login,
  verify,
  logout,
  resendOTP,
  forgotPassword,
} = require("../controller/auth.controller");
const refreshTokenMiddleware = require("../middleware/refresh-token.middleware");
const {
  RegisterValidatorMiddleware,
  VerifyValidatorMiddleware,
  LoginValidatorMiddleware,
  ResendOTPValidatorMiddleware,
  ForgotPasswordValidatorMiddleware,
} = require("../middleware/auth-validation.middleware");

const authRouter = Router();

authRouter.post("/register", RegisterValidatorMiddleware, register);
authRouter.post("/verify", VerifyValidatorMiddleware, verify);
authRouter.post("/login", LoginValidatorMiddleware, login);
authRouter.get("/refresh_token", refreshTokenMiddleware);
authRouter.get("/logout", logout);
authRouter.post("/resend_otp", ResendOTPValidatorMiddleware, resendOTP);
authRouter.post(
  "/forgot_password",
  ForgotPasswordValidatorMiddleware,
  forgotPassword
);

module.exports = authRouter;
