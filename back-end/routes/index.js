import express from 'express';

import {router as managersRouter} from './Managers.js';
import {router as usersRouter} from './Users.js';
import {router as reservationsRouter} from './Reservations.js';
import {router as picthesRouter} from './Pitches.js';

export const router = express.Router();

router.use("/managers", managersRouter);
router.use("/users", usersRouter);
router.use("/reservations", reservationsRouter);
router.use("/pitches", picthesRouter);