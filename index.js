const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");

require("dotenv").config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectDB() 

// routes


// error handler

// app.use(errorMiddleware); 

// multer/
app.use("/images", express.static("upload/images"));

const PORT = +process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log("Server going on", PORT);
});
