import {db} from "./config.js";
import {DataTypes} from "sequelize";

export const Review = db.define("Review", {
    ID: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
	Rating: {
		type: DataTypes.FLOAT,
	},
    Details: {
		type: DataTypes.TEXT,
	},
});