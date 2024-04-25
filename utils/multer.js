const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const filefilter = (req, file, cb) => {
  let allowedFiles = /png|jpg|jpeg|webp|gif/;
  let minetype = allowedFiles.test(file.mimetype);
  let extname = allowedFiles.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (minetype && extname) {
    cb(null, true);
  } else {
    cb(`ERROR: ONLY ${allowedFiles} IMAGE EXTENSIONS ARE ALLOWED`, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter});

module.exports = upload;
