'use strict'
import User from '../models/userModel'

export { addUser };

async function addUser(username, pass_hash, _facility) {
	User.create(username, pass_hash, _facility)
	.then(console.log);
}