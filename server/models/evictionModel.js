'use strict'
import mongoose from 'mongoose';

//TODO: add validation and error handling
const evictionsSchema = new mongoose.Schema({
	tenant: {type: mongoose.ObjectId, ref: 'Tenant', required: true, index: true},
	facility: {type: mongoose.ObjectId, ref: 'Facility', required: true, index: true},
	user: {type: mongoose.ObjectId, ref: 'User', required: true, index: true},
	reason: {type: mongoose.ObjectId, ref: 'Reason', required: true, index: true},
	details: {type: [String], required: true}, //TODO: convert to nested document with timestamps for each entry
	evicted: {type: Date, required: true}
}, {timestamps: true});

export const Eviction = mongoose.model("Eviction", evictionsSchema);

export async function addEviction(tenant, facility, user, reason, details, evictedDate) {
	Eviction.create(tenant, facility, user, reason, details, evictedDate)
	.then(console.log);
}