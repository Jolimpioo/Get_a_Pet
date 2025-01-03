import multer from "multer";
import path from "path";

// destination to store the images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    );
  },
});

// Add validation and catch errors for invalid file types
function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(png|jpg)$/)) {
    return cb(new Error("Por favor, envie apenas arquivo .jpg ou .png!"));
  }
  cb(null, true);
}

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter,
});
