'use strict'
import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	pass_hash: {type: String, required: true},
	facility: {type: ObjectId, ref: 'Facility', required: true}
});

export const User = mongoose.model('Users', userSchema);

export async function addUser(username, pass_hash, _facility) {
	User.create(username, pass_hash, _facility)
	.then(console.log);
}