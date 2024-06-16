import { db } from "./config.js";
import { DataTypes } from "sequelize";

export const Pitch = db.define("Pitch", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	location: {
		type: DataTypes.STRING,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	rate: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	imageLink: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.TEXT
	},
	latitude: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	longitude: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	inside: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	rating: {
		type: DataTypes.FLOAT,
	},
},
	{
		indexes: [
			{
				unique: true,
				fields: ['location', 'name']
			}
		]
	});