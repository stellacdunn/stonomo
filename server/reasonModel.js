import mongoose from 'mongoose'

export { Reason, addReason, getReasons /*, updateReason, deleteReason */}

//TODO: add indexing
const reasonsSchema = new mongoose.Schema({
	label: String,
	desc: String
})

const Reason = mongoose.model("Reason", reasonsSchema)

async function addReason(label, desc) {
	await Reason.create(new Reason({label, desc}))
}

async function getReasons() {
	return Reason.find()
}