'use strict'
import Eviction from '../models/evictionModel';

export { addEviction };

async function addEviction(tenant, facility, user, reason, details, evictedDate) {
	Eviction.create(tenant, facility, user, reason, details, evictedDate)
	.then(console.log);
}