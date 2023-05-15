const router = require("express").Router();
const userController = require("../controllers/userController")
const multer = require("multer");
const fs = require("fs");
const path = require("path");

router.post("/create-category", userController.createCategory)
router.get("/get-category", userController.displayCategory)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});

router.post("/upload-file", upload.fields([
  {
    name: "videos",
    maxCount: 5,
  },
]), userController.uploadFile)
router.get("/all", userController.getAll);

module.exports = router;