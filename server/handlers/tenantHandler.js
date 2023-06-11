'use strict'
import Tenant from '../models/tenantModel'

export { addTenant };

async function addTenant(fname, lname, phone, email, address, dob) {
	new Tenant(fname, lname, phone, email, address, dob).save()
	.then(console.log);
}