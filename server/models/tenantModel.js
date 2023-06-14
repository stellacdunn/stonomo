'use strict'
import mongoose from 'mongoose';
import { AddressSchema, PhoneSchema } from './sharedModels';

const TenantSchema = new mongoose.Schema({
	fname: { type: String, select: true, required: true },
	mname: { type: String, select: true, required: true },
	lname: { type: String, select: true, required: true },
	phone: { type: [PhoneSchema], select: true, required: true },
	email: { type: [String], select: true }, //TODO: add validation
	address: { type: [AddressSchema], select: true, required: true }, //TODO: add validation via USPS(?)
	dob: { type: Date, required: true } //TODO: add validation; age > 18
}, { timestamps: true });

export const Tenant = mongoose.model('Tenant', TenantSchema);

export function addTenant(fname, lname, phone, email, address, dob) {
	let t = Tenant.create(fname, lname, phone, email, address, dob)
		.lean()
		.then(console.log);
	return t;
}

export function getTentantById(id) {
	let t = Tenant.findById(id)
		.then(console.log);
	return t;
}

export function getTentantByIdLean(id) {
	let t = Tenant.findById(id)
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

	let t = Tenant.findByIdAndUpdate(id, { $set: updateParams })
		.lean()
		.then(console.log);
	return t;
}

//TODO: delete function needs to be protected for security reasons
export function __deleteTenant(id) {
	let t = Tenant.findByIdAndDelete(id)
		.lean()
		.then(console.log);
	return t;
}