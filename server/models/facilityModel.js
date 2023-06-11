'use strict'
import mongoose from 'mongoose';

//TODO: add validation and error handling
const facilitySchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: {type: String, required: true},
	phone: {type: String, match: /(?:\d{3}-?)\d{4}/},
	email: String,
	company: String
}, {timestamps: true});

export const Facility = mongoose.model("Facility", facilitySchema);