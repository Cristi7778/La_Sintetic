import express from 'express';
import * as pitchController from "../controllers/Pitches.js"

export const router = express.Router();

router.get("/", pitchController.getPitches);
router.get("/:username", pitchController.getById);
router.post("/", pitchController.create);
router.put("/:username", pitchController.update);
router.delete("/:username", pitchController.remove);
