import {db} from "./config.js";
import {DataTypes} from "sequelize";

export const Reservation = db.define("Reservation", {
    ID: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
	Date: {
		type: DataTypes.DATE,
	},
});