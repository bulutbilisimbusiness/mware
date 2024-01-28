"use strict";
const { mongoose } = require("../configs/dbConnection");

const ReservationSchema = new mongoose.Schema(
	{
        flightId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Flight',
            required:true
        },
        passengers:[],
		
		createdId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		collection: "passengers",
		timestamps: true,
	}
);

module.exports = mongoose.model("Reservation", ReservationSchema);
