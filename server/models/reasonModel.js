"use strict"
import mongoose from 'mongoose';

export { Reason, addReason, getReasons /*, updateReason, deleteReason */};

//TODO: add indexing
const reasonSchema = new mongoose.Schema({
	label: String,
	desc: String
});

const Reason = mongoose.model('Reason', reasonSchema);

async function addReason(label, desc) {
	new Reason({label, desc}).save()
	.then(console.log);
}

async function getReasons() {
	return Reason.find();
}