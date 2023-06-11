'use strict'
import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

//TODO: add validation and error handling
const evictionsSchema = new mongoose.Schema({
	tenant: {type: ObjectId, ref: 'Tenant', required: true, index: true},
	facility: {type: ObjectId, ref: 'Facility', required: true, index: true},
	user: {type: ObjectId, ref: 'User', required: true, index: true},
	reason: {type: ObjectId, ref: 'Reason', required: true, index: true},
	details: {type: [String], required: true}, //TODO: convert to nested document with timestamps for each entry
	evicted: {type: Date, required: true}
}, {timestamps: true});

export const Eviction = mongoose.model("Eviction", evictionsSchema);