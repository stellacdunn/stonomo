'use strict'
import mongoose from 'mongoose';

export { Facility, addFacility /*, updateFacility, deleteFacility*/ };

//TODO: add validation and error handling
const facilitySchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: {type: String, required: true},
	phone: {type: String, match: /(?:\d{3}-?)\d{4}/},
	email: String,
	company: String
}, {timestamps: true});

const Facility = mongoose.model("Facility", facilitySchema);

async function addFacility(name, address, phone, email, company) {
	new Facility({name, address, phone, email, company}).save()
	.then(console.log)
}