import express from 'express';
import cors from 'cors';
import {router as indexRouter} from './routes/index.js';
import {synchronizeDatabase} from './models/config.js';
import { User } from './models/users.js';
import { Manager } from './models/Managers.js';
import { Reservation } from './models/Reservations.js';
import { Pitch } from './models/Pitches.js';

const PORT = 8080;
Manager.hasMany(Pitch);
Pitch.belongsTo(Manager);

User.hasMany(Reservation);
Reservation.belongsTo(User);

Pitch.hasMany(Reservation);
Reservation.belongsTo(Pitch);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", indexRouter);

const server = app.listen(PORT, async () => {
	try {
		await synchronizeDatabase();
		console.log(`Server started on http://localhost:${PORT}`);
	} catch (err) {
		console.log("There was an error with the database connection");
		server.close();
	}
});