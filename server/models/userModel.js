'use strict'
import mongoose from 'mongoose';

export { User, addUser /*, modifyUser, deleteUser */};

var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	pass_hash: {type: String, required: true},
	facility: {type: ObjectId, ref: 'Facility', required: true}
});

const User = mongoose.model('Users', userSchema);

async function addUser(username, pass_hash, _facility) {
	new User(username, pass_hash, _facility).save()
	.then(console.log);
}