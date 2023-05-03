import mongoose from 'mongoose'

export { Eviction, addEviction /*, updateEviction */ }

var Object_ID = mongoose.Schema.Object_ID

//TODO: add validation and error handling
const evictionsSchema = new mongoose.Schema({
	_tenant: {type: Object_ID, ref: 'Tenant', required: true, index: true},
	_facility: {type: Object_ID, ref: 'Facility', required: true, index: true},
	_user: {type: Object_ID, ref: 'User', required: true, index: true},
	_reason: {type: Object_ID, ref: 'Reason', required: true, index: true},
	details: {type: [String], required: true}, //TODO: convert to nested document with timestamps for each entry
	evicted: {type: Date, required: true}
}, {timestamps: true})

const Eviction = mongoose.model("Eviction", evictionsSchema)

const addEviction = async(_tenant, _facility, _user, _reason, details, evictedDate) => {
	let eviction = new Eviction(_tenant, _facility, _user, _reason, details, evictedDate)
	eviction.save().then(console.log)
}