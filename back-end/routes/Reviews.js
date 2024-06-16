import express from 'express';
import * as reviewController from "../controllers/Reviews.js"

export const router = express.Router();

router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.create);
router.put("/:id", reviewController.update);
router.delete("/:id", reviewController.remove);