import {db} from "./config.js";
import {DataTypes} from "sequelize";

export const Manager = db.define("Manager", {
	username: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	phone: {
		type: DataTypes.STRING,
        allowNull: false
	},
    email: {
        type:DataTypes.STRING,
        allowNull: false
    }
});