"use strict";
const { mongoose } = require("../configs/dbConnection");

const FlightSchema = new mongoose.Schema(
	{
		flightNumber: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		airline: {
			type: String,
			trim: true,
			required: true,
		},
		departure: {
			type: String,
			trim: true,
			required: true,
		},
		departureDate: {
			type: Date,
			required: true,
		},
		arrival: {
			type: String,
			trim: true,
			required: true,
		},
		arrivalDate: {
			type: Date,
			required: true,
		},
		createdId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		collection: "flights",
		timestamps: true,
	}
);
const dateToLocaleString=require('../helpers/dateToLocaleString')
FlightSchema.pre('init',function(document){
	document.departureDateStr=dateToLocaleString(document.departureDate)
	document.arrivalDateStr=dateToLocaleString(document.arrivalDate)
	document.__v=undefined
})
module.exports = mongoose.model("Flight", FlightSchema);
