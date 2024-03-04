import { Reservation } from "../models/Reservations.js";

const getReservations = async (req, res) => {
    const reservation= await Reservation.findAll();
    res.status(200).send({records: reservation});
}

const getById = async(req, res) => {
	try {
		const reservation = await Reservation.findByPk(req.params.id);
		if (reservation) {
			res.status(200).send({reservation: reservation});
		} else {
			res.status(404).send({message: "reservation not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const create = async (req, res) => {
	const reservation = req.body;
	await Reservation.create(reservation);

	res.status(201).send({message:"Reservation was created"});
};

const update = async (req, res) => {
	try {
		const reservation = await reservation.findByPk(req.params.id);
		if (reservation) {
			const updatedReservation = await reservation.update(req.body);
			res.status(200).send({pitch: updatedReservation});
		} else {
			res.status(404).send({message: "reservation not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const remove = async (req, res) => {
	try {
		const reservation = await Reservation.findByPk(req.params.id);
		if (reservation) {
			await reservation.destroy();
			res.status(200).send({message: "deleted reservation"});
		} else {
			res.status(404).send({message:"user not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

export {
    getReservations,
    getById,
    create,
    update,
    remove,
}