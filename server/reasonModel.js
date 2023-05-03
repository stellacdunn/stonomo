import mongoose from 'mongoose'

export { Reason, addReason, /*, updateReason, deleteReason */}

//TODO: add indexing
const reasonsSchema = new mongoose.Schema({
	label: String,
	desc: String
})

const Reason = mongoose.model("Reason", reasonsSchema)

const addReason = async(label, desc) => {
	let reason = new Reason(label, desc)
	reason.save().then(console.log)
}