const AuthSchema = require("../schema/auth.schema")
const bcrypt = require("bcryptjs");

// register

const register = async (req, res, next) => {
  try {
    const { username, email, password, birth_year } = req.body;

    const exists = await AuthSchema.findOne({
      $or: [{ email }, { username }],
    });

    if (exists) {
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

    res.status(201).json({
      message: "you are registred ✌️",
    });
  } catch (error) {
    next(error);
  }
};

// verify

async function verify(req, res, next) {
  try {
    const { email, otp } = req.body;
    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    if (foundedUser.isVerified) {
      throw CustomErrorHandler.BadRequest("User already verified");
    }

    const time = Date.now();

    if (time > foundedUser.otpTime) {
      throw CustomErrorHandler.BadRequest("OTP time expired");
    }

    if (otp !== foundedUser.otp) {
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

    res.status(200).json({
      message: "Succes",
      access_token,
    });
  } catch (error) {
    next(error);
  }
}

/// resend OTP

async function resendOTP(req, res, next) {
  try {
    const { email } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
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

    res.status(200).json({
      message: "verification code resent",
    });
  } catch (error) {
    next(error);
  }
}

// login

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await AuthSchema.findOne({ email }).select("+password");

    if (!user) {
      throw CustomErrorHandler.NotFound("you are not registered");
    }

    const decode = await bcrypt.compare(password, user.password);

    if (!decode) {
      throw CustomErrorHandler.UnAuthorized("Invalid password");
    }

    if (!user.isVerified) {
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

    res.status(200).json({
      message: "Succes",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

// forget password

const forgotPassword = async (req, res, next) => {
  try {
    const { email, new_password, otp } = req.body;

    const user = await AuthSchema.findOne({ email });

    if (!user) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    if (!user.isVerified) {
      throw CustomErrorHandler.UnAuthorized("user not verified");
    }

    const time = Date.now();

    if (time > user.otpTime) {
      throw CustomErrorHandler.BadRequest("OTP time expired");
    }

    if (otp !== user.otp) {
      throw CustomErrorHandler.BadRequest("wrong verification code");
    }

    const hash = await bcrypt.hash(new_password, 14);

    await AuthSchema.findByIdAndUpdate(user._id, {
      password: hash,
      otp: null,
      otpTime: null,
    });

    res.status(200).json({
      message: "Password changed",
    });
  } catch (error) {
    next(error);
  }
};

// logout

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({
      message: "you are logged out",
    });
  } catch (error) {
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
