'use strict'
import Facility from '../models/facilityModel';

export { addFacility };

async function addFacility(name, address, phone, email, company) {
	Facility.create({name, address, phone, email, company})
	.then(console.log)
}