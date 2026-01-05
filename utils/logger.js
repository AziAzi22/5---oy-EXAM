// const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { simple, colorize, timestamp, combine } = format;
require("winston-mongodb");

const logger = createLogger({
  level: "debug",
  // format: winston.format.json(),
  // format: winston.format.prettyPrint(),
  //   format: simple(),
  format: combine(
    timestamp(),
    // colorize({ all: true }),
    simple()
  ),
  transports: [
    // new transports.Console(),
    // new transports.File({ filename: "log/universal.log" }),
    new transports.MongoDB({ db: process.env.MONGO_URI }),
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});

module.exports = logger;
