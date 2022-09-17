const multer = require("multer");

const imagesStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "_" + file.originalname);
  },
});

const avatarsStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "_" + file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

exports.uploadImages = multer({
  storage: imagesStorageEngine,
  fileFilter: filter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

exports.uploadAvatars = multer({
  storage: avatarsStorageEngine,
  fileFilter: filter,
  limits: { fileSize: 1024 * 1024 * 10 },
});
