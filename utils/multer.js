const multer = require("multer");
const { extname } = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now();
    const ext = extname(file.originalname);
    return cb(null, `${uniqueName}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;