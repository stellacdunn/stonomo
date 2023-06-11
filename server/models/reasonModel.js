'use strict'
import mongoose from 'mongoose';

//TODO: add indexing
const reasonSchema = new mongoose.Schema({
	label: String,
	desc: String
});

export const Reason = mongoose.model('Reason', reasonSchema);

export async function addReason(label, desc) {
	Reason.create({label, desc})
	.then(console.log);
}

export async function getReasons() {
	return Reason.find();
}

export async function populateReasons() {
    const reasonDict = await import('./data/reasons.json', {
        assert: {type: 'json'}
    });

    for (const r in reasonDict.default) {
        const desc = reasonDict.default[r];
        addReason(r, desc).catch(console.error);
    }

    return await getReasons();
}