import  {Manager} from "../models/Managers.js";

const getManagers = async (req, res) => {
    const manager= await Manager.findAll();
    res.status(200).send({records: manager});
}

const getByUsername = async(req, res) => {
	try {
		const manager = await Manager.findByPk(req.params.username);
		if (manager) {
			res.status(200).send({manager: manager});
		} else {
			res.status(404).send({message: "manager not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const create = async (req, res) => {
	const manager = req.body;
	await Manager.create(manager);

	res.status(201).send({message: "Manager was created"});
};

const update = async (req, res) => {
	try {
		const manager = await Manager.findByPk(req.params.username);
		if (manager) {
			const updatedManager = await manager.update(req.body);
			res.status(200).send({manager: updatedManager});
		} else {
			res.status(404).send({message: "Manager not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const remove = async (req, res) => {
	try {
		const manager = await Manager.findByPk(req.params.username);
		if (manager) {
			await manager.destroy();
			res.status(200).send({message: "deleted manager"});
		} else {
			res.status(404).send({message:"manager not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

export {
    getManagers,
    getByUsername,
    create,
    update,
    remove,
}