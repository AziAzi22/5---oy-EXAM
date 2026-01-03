const { Schema, model, set } = require("mongoose");

const Auth = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "Username is required"],
      set: (value) => value.trim(),
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [30, "Username must be at most 30 characters long"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      set: (value) => value.trim().toLowerCase(),
      minLength: [10, "Email must be at least 10 characters long"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      set: (value) => value.trim(),
      minLength: [8, "Password must be at least 8 characters long"],
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      set: (value) => value.trim().toLowerCase(),
      enum: {
        values: ["user", "admin", "superadmin"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
    birth_year: {
      type: Number,
      min: [1900, "Birth year must be at least 1900"],
      max: [new Date().getFullYear() - 13, "User must be older than 13 years"],
      required: [true, "Birth year is required"],
    },
    otp: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpTime: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AuthSchema = model("Auth", Auth);

module.exports = AuthSchema;
