"use strict";

// Reservation Controller:
const Passenger = require("../models/passenger");
const Reservation = require("../models/reservation");

module.exports = {
	list: async (req, res) => {
		/*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

		const data = await res.getModelList(Reservation,{},'passengers');

		res.status(200).send({
			error: false,
			details: await res.getModelListDetails(Reservation),
			data,
		});
	},

	create: async (req, res) => {
		/*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                 schema: {
                    "flightId": "...Flight.objectId...",
                    "passengers": [
                        "...Passenger.objectId...",
                        {
                            "firstName": "string",
                            "lastName": "string",
                            "email": "string:email",
                        }
                    ]
                }
            }
        */

		let passengerInfos = req.body?.passengers || [],
			passengerIds = [],
			passenger = false;

		for (let passengerInfo of passengerInfos) {
            Object.assign(passengerInfo, { createdId: req.user?._id });
			if (typeof passengerInfo == "object") {
				passenger = await Passenger.findOne({ email: passengerInfo.email });

				if(!passenger) passenger=await Passenger.create(passengerInfo)
			} else {
				passenger = await Passenger.findOne({ _id: passengerInfo });
				
			}
            if(passenger) passengerIds.push(passenger._id);
		}
		req.body.passengers = passengerIds;

        
		const data = await Reservation.create(req.body);

		res.status(201).send({
			error: false,
			data,
		});
	},

	read: async (req, res) => {
		/*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

		const data = await Reservation.findOne({ _id: req.params.id });

		res.status(200).send({
			error: false,
			data,
		});
	},

	update: async (req, res) => {
		/*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {$ref: '#/definitions/Reservation
                    
                }
            }
        */

		const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
			runValidators: true,
		});

		res.status(202).send({
			error: false,
			data,
			new: await Reservation.findOne({ _id: req.params.id }),
		});
	},

	delete: async (req, res) => {
		/*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

		const data = await Reservation.deleteOne({ _id: req.params.id });

		res.status(data.deletedCount ? 204 : 404).send({
			error: !data.deletedCount,
			data,
		});
	},
    passengers: async (req, res) => {
		/*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Passengers of  Reservation"
        */

		const data = await Reservation.findOne({ _id: req.params.id });
        const passengers=await Passenger.find({_id: { $in: data.passengers } })
		res.status(200).send({
			error: false,
			passengers,
		});
	},
};
