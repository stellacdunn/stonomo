import mongoose from 'mongoose'

export { User, addUser /*, modifyUser, deleteUser */}

var Object_ID = mongoose.Schema.Object_ID

const User = mongoose.model("Users", userSchema)

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	pass_hash: {type: String, required: true},
	_facility: {type: Object_ID, ref: 'Facility', required: true}
})

const addUser = async(username, pass_hash, _facility) => {
	let user = new User(username, pass_hash, _facility)
	user.save().then(console.log)
}