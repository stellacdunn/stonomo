'use strict'
import mongoose from 'mongoose';

//TODO: add validation and error handling
const facilitySchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	phone: { type: String, match: /(?:\d{3}-?)\d{4}/ },
	email: String,
	company: String
}, { timestamps: true });

export const Facility = mongoose.model("Facility", facilitySchema);

export async function addFacility(name, address, phone, email, company) {
	let f = Facility.create({ name, address, phone, email, company })
		.then(console.log)
	return f;
}

export function getFacilityById(id) {
	let f = Facility.findById(id)
		.then(console.log);
	return f;
}

export function getFacilityByIdLean(id) {
	let f = Facility.findById(id)
		.lean()
		.then(console.log);
	return f;
}

export function updateFacility(id, ...fields) {
	let updateParams = {}
	for (let i = 0; i < fields.length - 1; i++) {
		const key = fields[i];
		const value = fields[i + 1];
		updateParams[key] = value;
	}

	let f = Facility.findByIdAndUpdate(id, { $set: updateParams })
		.lean()
		.then(console.log);
	return f;
}

//TODO: delete function needs to be protected for security reasons
export function __deleteFacility(id) {
	let f = Facility.findByIdAndDelete(id)
		.lean()
		.then(console.log);
	return f;
}