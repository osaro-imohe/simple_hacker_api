import express from "express";
import { login } from "../controllers/authController.js";
import { patchJson } from "../controllers/patchController.js";
import { resizeImage } from "../controllers/imageController.js";
import isAuthenticated from "../middleware/isAuthenitcated.js";

const router = express.Router();

router.post("/login", login);
router.post("/patch", isAuthenticated, patchJson);
router.post("/resize", isAuthenticated, resizeImage);

export default router;
