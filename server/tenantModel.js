import mongoose from 'mongoose'

export { Tenant, addTenant /*, updateTenant, deleteTenant */}

const tenantSchema = new mongoose.Schema({
	fname: {type: String, select: true, required: true},
	lname: {type: String, select: true, required: true},
	phone: {type: String, match: /(?:\d{3}-?)\d{4}/}, //TODO: extract validation
	email: String, //TODO: add validation
	address: String, //TODO: add validation via USPS(?)
	dob: Date //TODO: add validation; age > 18
}, {timestamps: true})


const Tenant = mongoose.model("Tenant", tenantSchema)

const addTenant = async(fname, lname, phone, email, address, dob) => {
	let tenant = new Tenant(fname, lname, phone, email, address, dob)
	tenant.save().then(console.log)
}