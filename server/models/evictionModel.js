'use strict'
import mongoose from 'mongoose';

//TODO: add validation and error handling
const evictionsSchema = new mongoose.Schema({
	tenant: { type: mongoose.ObjectId, ref: 'Tenant', required: true, index: true },
	facility: { type: mongoose.ObjectId, ref: 'Facility', required: true, index: true },
	user: { type: mongoose.ObjectId, ref: 'User', required: true, index: true },
	reason: { type: mongoose.ObjectId, ref: 'Reason', required: true, index: true },
	details: { type: [String], required: true }, //TODO: convert to nested document with timestamps for each entry
	evicted: { type: Date, required: true }
}, { timestamps: true });

export const Eviction = mongoose.model("Eviction", evictionsSchema);

export async function addEviction(tenant, facility, user, reason, details, evictedDate) {
	let e = Eviction.create(tenant, facility, user, reason, details, evictedDate)
		.then(console.log);
	return e;
}

export function getEvictionById(id) {
	let e = Eviction.findById(id)
		.then(console.log);
	return e;
}

export function getEvictionByIdLean(id) {
	let e = Eviction.findById(id)
		.lean()
		.then(console.log);
	return e;
}

export function updateEviction(id, ...fields) {
	let updateParams = {}
	for (let i = 0; i < fields.length - 1; i++) {
		const key = fields[i];
		const value = fields[i + 1];
		updateParams[key] = value;
	}

	let e = Eviction.findByIdAndUpdate(id, { $set: updateParams })
		.lean()
		.then(console.log);
	return e;
}

//TODO: delete function needs to be protected for security reasons
export function __deleteEviction(id) {
	let e = Eviction.findByIdAndDelete(id)
		.lean()
		.then(console.log);
	return e;
}