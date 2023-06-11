'use strict'
import User from '../models/userModel'

export { addUser };

async function addUser(username, pass_hash, _facility) {
	new User(username, pass_hash, _facility).save()
	.then(console.log);
}