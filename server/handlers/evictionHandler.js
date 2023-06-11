'use strict'
import Eviction from '../models/evictionModel';

export { addEviction };

async function addEviction(tenant, facility, user, reason, details, evictedDate) {
	new Eviction(tenant, facility, user, reason, details, evictedDate).save()
	.then(console.log);
}