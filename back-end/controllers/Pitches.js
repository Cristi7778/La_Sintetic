import {Pitch} from '../models/Pitches';

const getPitches = async (req, res) => {
    const pitch= await Pitch.findAll();
    res.status(200).send({records: pitch});
}

const getById = async(req, res) => {
	try {
		const pitch = await Pitch.findByPk(req.params.id);
		if (pitch) {
			res.status(200).send({pitch: pitch});
		} else {
			res.status(404).send({message: "pitch not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const create = async (req, res) => {
	const pitch = req.body;
	await Pitch.create(pitch);

	res.status(201).send({message: "Pitch was created"});
};

const update = async (req, res) => {
	try {
		const pitch = await Pitch.findByPk(req.params.id);
		if (pitch) {
			const updatedPitch = await pitch.update(req.body);
			res.status(200).send({pitch: updatedPitch});
		} else {
			res.status(404).send({message: "pitch not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const remove = async (req, res) => {
	try {
		const pitch = await Pitch.findByPk(req.params.id);
		if (pitch) {
			await pitch.destroy();
			res.status(200).send({message: "deleted pitch"});
		} else {
			res.status(404).send({message:"user not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

export {
    getPitches,
    getById,
    create,
    update,
    remove,
}