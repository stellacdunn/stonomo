'use strict'
import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	pass_hash: { type: String, required: true },
	facility: { type: ObjectId, ref: 'Facility', required: true }
});

export const User = mongoose.model('Users', userSchema);

export function addUser(username, pass_hash, _facility) {
	let u = User.create(username, pass_hash, _facility)
		.then(console.log);
	return u;
}

export function getUserById(id) {
	let u = User.findById(id)
		.then(console.log);
	return u;
}

export function getUserByIdLean(id) {
	let u = User.findById(id)
		.lean()
		.then(console.log);
	return u;
}

export function updateUser(id, ...fields) {
	let updateParams = {}
	for (let i = 0; i < fields.length - 1; i++) {
		const key = fields[i];
		const value = fields[i + 1];
		updateParams[key] = value;
	}

	let u = User.findByIdAndUpdate(id, { $set: updateParams })
		.lean()
		.then(console.log);
	return u;
}

//TODO: delete function needs to be protected for security reasons
export function __deleteUser(id) {
	let u = User.findByIdAndDelete(id)
		.lean()
		.then(console.log);
	return u;
}