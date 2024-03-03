import express from 'express';
import * as managerController from "../controllers/Managers"

export const router = express.Router();

router.get("/", managerController.getManagers);
router.get("/:username", managerController.getByUsername);

router.post("/", managerController.create);
router.put("/:username", managerController.update);
router.delete("/:username", managerController.remove);
