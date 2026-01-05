const AuthSchema = require("../schema/auth.schema");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

// register

const register = async (req, res, next) => {
  try {
    const { username, email, password, birth_year } = req.body;

    const exists = await AuthSchema.findOne({
      $or: [{ email }, { username }],
    });

    if (exists) {
      logger.warn(`Register attempt with existing email/username: ${email}`);

      throw CustomErrorHandler.AlreadyExist("Email or username already exists");
    }

    const hash = await bcrypt.hash(password, 14);

    const generatedCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const time = Date.now() + 5 * 60 * 1000;

    await AuthSchema.create({
      username,
      email,
      password: hash,
      birth_year,
      otp: generatedCode,
      otpTime: time,
    });

    await sendMessage(email, generatedCode);

    logger.info(`user registered with email: ${email}`);

    res.status(201).json({
      message: "you are registred ✌️",
    });
  } catch (error) {
    logger.error("Register error", error);

    next(error);
  }
};

// verify

async function verify(req, res, next) {
  try {
    const { email, otp } = req.body;
    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      logger.warn(`Verification attempt with non-existing email: ${email}`);

      throw CustomErrorHandler.NotFound("User not found");
    }

    if (foundedUser.isVerified) {
      throw CustomErrorHandler.BadRequest("User already verified");
    }

    const time = Date.now();

    if (time > foundedUser.otpTime) {
      logger.warn(`Verification attempt with expired OTP: ${email}`);

      throw CustomErrorHandler.BadRequest("OTP time expired");
    }

    if (otp !== foundedUser.otp) {
      logger.warn(`Verification attempt with wrong OTP: ${email}`);

      throw CustomErrorHandler.BadRequest("wrong verification code");
    }

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      isVerified: true,
      otp: null,
      otpTime: null,
    });

    const payload = {
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      id: foundedUser._id,
    };

    const access_token = accessToken(payload);
    const refresh_token = refreshToken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 1000,
    });

    logger.info(`user verified with email: ${email}`);

    res.status(200).json({
      message: "Succes",
      access_token,
    });
  } catch (error) {
    logger.error("Verify error", error);

    next(error);
  }
}

/// resend OTP

async function resendOTP(req, res, next) {
  try {
    const { email } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      logger.warn(`Resend OTP attempt with non-existing email: ${email}`);

      throw CustomErrorHandler.UnAuthorized("you are not registered");
    }

    const generatedCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const time = Date.now() + 5 * 60 * 1000;

    foundedUser.otp = generatedCode;
    foundedUser.otpTime = time;
    await foundedUser.save();

    await sendMessage(email, generatedCode);

    logger.info(`OTP resent email: ${email}`);

    res.status(200).json({
      message: "verification code resent",
    });
  } catch (error) {
    logger.error("Resend OTP error", error);

    next(error);
  }
}

// login

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await AuthSchema.findOne({ email }).select("+password");

    if (!user) {
      logger.warn(`Login attempt with non-existing email: ${email}`);

      throw CustomErrorHandler.NotFound("you are not registered");
    }

    const decode = await bcrypt.compare(password, user.password);

    if (!decode) {
      logger.warn(`Login attempt with wrong password: ${email}`);

      throw CustomErrorHandler.UnAuthorized("Invalid password");
    }

    if (!user.isVerified) {
      logger.warn(`Login attempt with non-verified email: ${email}`);

      throw CustomErrorHandler.UnAuthorized("you are not verified");
    }

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id,
    };

    const access_token = accessToken(payload);
    const refresh_token = refreshToken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 1000,
    });

    logger.info(`user logged with email: ${email}`);

    res.status(200).json({
      message: "Succes",
      access_token,
    });
  } catch (error) {
    logger.error("Login error", error);

    next(error);
  }
};

// forget password

const forgotPassword = async (req, res, next) => {
  try {
    const { email, new_password, otp } = req.body;

    const user = await AuthSchema.findOne({ email });

    if (!user) {
      logger.warn(`Forgot password attempt with non-existing email: ${email}`);

      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    if (!user.isVerified) {
      logger.warn(`Forgot password attempt with non-verified email: ${email}`);

      throw CustomErrorHandler.UnAuthorized("user not verified");
    }

    const time = Date.now();

    if (time > user.otpTime) {
      logger.warn(`Forgot password attempt with expired otp: ${email}`);

      throw CustomErrorHandler.BadRequest("OTP time expired");
    }

    if (otp !== user.otp) {
      logger.warn(`Forgot password attempt with wrong otp: ${email}`);

      throw CustomErrorHandler.BadRequest("wrong verification code");
    }

    const hash = await bcrypt.hash(new_password, 14);

    await AuthSchema.findByIdAndUpdate(user._id, {
      password: hash,
      otp: null,
      otpTime: null,
    });

    logger.info(`user forgot password with email: ${email}`);

    res.status(200).json({
      message: "Password changed",
    });
  } catch (error) {
    logger.error("Forgot password error", error);

    next(error);
  }
};

// logout

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    logger.info("user logged out");

    res.status(200).json({
      message: "you are logged out",
    });
  } catch (error) {
    logger.error("Logout error", error);

    next(error);
  }
};

module.exports = {
  register,
  login,
  verify,
  logout,
  resendOTP,
  forgotPassword,
};
