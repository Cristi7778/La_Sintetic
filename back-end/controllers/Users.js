import { User } from "../models/Users.js";

const getUsers = async (req, res) => {
    const user= await User.findAll();
    res.status(200).send({records: user});
}

const getByUsername = async(req, res) => {
	try {
		const user = await User.findByPk(req.params.username);
		if (user) {
			res.status(200).send({user: user});
		} else {
			res.status(404).send({message: "user not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const create = async (req, res) => {
	const user = req.body;
	await User.create(user);

	res.status(201).send({message: "User was created"});
};

const update = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.username);
		if (user) {
			const updatedUser = await user.update(req.body);
			res.status(200).send({user: updatedUser});
		} else {
			res.status(404).send({message: "User not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const remove = async (req, res) => {
	try {
		const user = await User.findByPk(req.params.username);
		if (user) {
			await user.destroy();
			res.status(200).send({message: "deleted user"});
		} else {
			res.status(404).send({message:"user not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

export {
    getUsers,
    getByUsername,
    create,
    update,
    remove,
}