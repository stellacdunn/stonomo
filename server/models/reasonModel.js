'use strict'
import mongoose from 'mongoose';

//TODO: add indexing
const reasonSchema = new mongoose.Schema({
    label: String,
    desc: String
});

export const Reason = mongoose.model('Reason', reasonSchema);

export async function addReason(label, desc) {
    Reason.create({ label, desc })
        .then(console.log);
}

export async function getAllReasons() {
    return Reason.find();
}

export async function populateReasons() {
    const reasonDict = await import('./data/reasons.json', {
        assert: { type: 'json' }
    });

    for (const r in reasonDict.default) {
        const desc = reasonDict.default[r];
        addReason(r, desc).catch(console.error);
    }

    return await getAllReasons();
}

export function getReasonById(id) {
    let r = Reason.findById(id)
        .lean()
        .then(console.log);
    return r;
}

export function getReason(label) {
    let r = Reason.findOne({ label: label })
        .lean()
        .then(console.log);
    return r;
}

export function updateReason(id, ...fields) {
    let updateParams = {}
    for (let i = 0; i < fields.length - 1; i++) {
        const key = fields[i];
        const value = fields[i + 1];
        updateParams[key] = value;
    }

    let r = Reason.findByIdAndUpdate(id, { $set: updateParams })
        .lean()
        .then(console.log);
    return r;
}

//TODO: delete function needs to be protected for security reasons
export function __deleteReason(id) {
    let r = Reason.findByIdAndDelete(id)
        .lean()
        .then(console.log);
    return r;
}