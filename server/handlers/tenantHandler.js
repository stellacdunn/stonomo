'use strict'
import Tenant from '../models/tenantModel'

export { addTenant };

async function addTenant(fname, lname, phone, email, address, dob) {
	Tenant.create(fname, lname, phone, email, address, dob)
	.then(console.log);
}