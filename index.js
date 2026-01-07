require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
const authRouter = require("./router/auth.routes");
const BrandRouter = require("./router/brand.routes");
const CarRouter = require("./router/car.routes");
const errorMiddleware = require("./middleware/error.middleware");
// const logger = require("./utils/logger");
const adminRouter = require("./router/admin.routes");

// swagger

const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const userRouter = require("./router/user.routes");
const swaggerDocs = YAML.load("./docs/documentation.yml");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
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
app.use(adminRouter); 
app.use(userRouter);

// swagger

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// error handler

app.use(errorMiddleware);

// multer/

app.use("/images", express.static("upload/images"));

const PORT = +process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server going on", PORT);
});
