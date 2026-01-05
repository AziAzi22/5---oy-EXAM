require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
const authRouter = require("./router/auth.routes");
const BrandRouter = require("./router/brand.routes");
const CarRouter = require("./router/car.routes");
const errorMiddleware = require("./middleware/error.middleware");
const logger = require("./utils/logger");
const adminRouter = require("./router/admin.routes");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// logger.warn("warning logger");
// logger.info("info logger");
// logger.debug("debug logger");
// logger.error("error logger");

// routes

app.use(authRouter);
app.use(BrandRouter);
app.use(CarRouter);
app.use(adminRouter)

// error handler

app.use(errorMiddleware);

// multer/

app.use("/images", express.static("upload/images"));

const PORT = +process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server going on", PORT);
});
