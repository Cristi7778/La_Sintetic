import express from 'express';
import * as pitchController from "../controllers/Pitches.js"

export const router = express.Router();

router.get("/", pitchController.getPitches);
router.get("/:id", pitchController.getById);
router.post("/", pitchController.create);
router.put("/:id", pitchController.update);
router.delete("/:id", pitchController.remove);
