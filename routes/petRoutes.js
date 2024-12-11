import express from "express";
import PetController from "../controllers/PetController.js";

// middlewares
import verifyToken from "../helpers/verify-token.js";
import { imageUpload } from "../helpers/image-upload.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);

router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getAllUserPets);

export default router;
