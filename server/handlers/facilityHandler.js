'use strict'
import Facility from '../models/facilityModel';

export { addFacility };

async function addFacility(name, address, phone, email, company) {
	new Facility({name, address, phone, email, company}).save()
	.then(console.log)
}