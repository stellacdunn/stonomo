'use strict'
import Reason from '../models/reasonModel';

export { addReason, getReasons, populateReasons };

async function addReason(label, desc) {
	new Reason({label, desc}).save()
	.then(console.log);
}

async function getReasons() {
	return Reason.find();
}

async function populateReasons() {
    const reasonDict = await import('./data/reasons.json', {
        assert: {type: 'json'}
    });

    for (const r in reasonDict.default) {
        const desc = reasonDict.default[r];
        addReason(r, desc).catch(console.error);
    }

    return await getReasons();
}