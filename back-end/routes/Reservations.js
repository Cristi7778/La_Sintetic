import express from 'express';
import * as reservationController from "../controllers/Reservations"

export const router = express.Router();

router.get("/", reservationController.getReservations);
router.get("/:id", reservationController.getById);

router.post("/", reservationController.create);
router.put("/:id", reservationController.update);
router.delete("/:id", reservationController.remove);
