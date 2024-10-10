import express from "express";
import { statsController, deviationController } from "../controllers/statController.js";

const router = express.Router();


router.get("/stats", statsController)

router.get("/deviation", deviationController)

export default router