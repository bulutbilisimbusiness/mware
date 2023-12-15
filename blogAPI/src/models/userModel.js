"use strict";
const mongoose = require("mongoose");
const passwordEncrypt=require('../helpers/passwordEncrypt')
const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			unique: true,
			required: [true, "Please add an Email"],
			validate: [
				(email) => (email.includes('@') && email.includes('.')),
                'email type is incorrect'
			],
		},
		password: {
			type: String,
			trim: true,
			require: true,
            set:(password)=>passwordEncrypt(password)
		},
		firstName: String,
		lastName: String,
	},
	{
		collection: "users",
		timestamps: true,
	}
);

module.exports = mongoose.model("User", UserSchema);
