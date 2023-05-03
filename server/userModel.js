import mongoose from 'mongoose'

export { User, addUser /*, modifyUser, deleteUser */}

var ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	pass_hash: {type: String, required: true},
	_facility: {type: ObjectId, ref: 'Facility', required: true}
})

const User = mongoose.model("Users", userSchema)

const addUser = async(username, pass_hash, _facility) => {
	let user = new User(username, pass_hash, _facility)
	user.save().then(console.log)
}