'use strict'
import mongoose from 'mongoose';
import { AddressSchema, PhoneSchema } from './sharedModels.js';

const TenantSchema = new mongoose.Schema({
	fname: { type: String, select: true, required: true },
	mname: { type: String, select: true, required: true, default: '' },
	lname: { type: String, select: true, required: true },
	phone: { type: [PhoneSchema], select: true, required: true },
	email: { type: [String], select: true }, //TODO: add validation
	address: { type: [AddressSchema], select: true, required: true }, //TODO: add validation via USPS(?)
	dob: { type: Date, required: true } //TODO: add validation; age > 18
}, { timestamps: true });

export const tenantModel = mongoose.model('Tenant', TenantSchema);

export function addTenant(fname, lname, phone, email, address, dob) {
	let t = tenantModel.create(fname, lname, phone, email, address, dob)
		.lean()
		.then(console.log);
	return t;
}

export function getTentantById(id) {
	let t = tenantModel.findById(id)
		.then(console.log);
	return t;
}

export function getTentantByIdLean(id) {
	let t = tenantModel.findById(id)
		.lean()
		.then(console.log);
	return t;
}

export function updateTenant(id, ...fields) {
	let updateParams = {}
	for (let i = 0; i < fields.length - 1; i++) {
		const key = fields[i];
		const value = fields[i + 1];
		updateParams[key] = value;
	}

	let t = tenantModel.findByIdAndUpdate(id, { $set: updateParams })
		.lean()
		.then(console.log);
	return t;
}

//TODO: delete function needs to be protected for security reasons
export function __deleteTenant(id) {
	let t = tenantModel.findByIdAndDelete(id)
		.lean()
		.then(console.log);
	return t;
}