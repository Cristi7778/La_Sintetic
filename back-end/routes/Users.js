import express from 'express';
import * as userController from "../controllers/Users.js"

export const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:username", userController.getByUsername);

router.post("/", userController.create);
router.put("/:username", userController.update);
router.delete("/:username", userController.remove);
