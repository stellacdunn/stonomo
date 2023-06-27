'use strict'
import mongoose from 'mongoose';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//TODO: add indexing
const reasonSchema = new mongoose.Schema({
    label: { type: String, select: true, required: true },
    desc: { type: String, select: true, required: true },
    enabled: { type: Boolean, default: true, required: true }
});

export const reasonModel = mongoose.model('Reason', reasonSchema);

export const allReasonsQuery = reasonModel.find();
export const enabledReasonsQuery = allReasonsQuery.nor({ disabled: true });

export async function addReason(lbl, desc) {
    // call replaceOne to prevent duplicate reasons accumulating with app restarts
    reasonModel.replaceOne(
        { label: lbl },
        { label: lbl, desc: desc },
        { upsert: true });
}

export async function populateReasons() {
    const reasonDict = require('../data/reasons.json');

    for (const r in reasonDict.default) {
        const desc = reasonDict.default[r];
        addReason(r, desc).catch(console.error);
    }

    return await allReasonsQuery.lean();
}

export function getReasonById(id) {
    let r = reasonModel.findById(id)
        .lean()
        .then(console.log);
    return r;
}

export function getReason(label) {
    let r = reasonModel.findOne({ label: label })
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

    let r = reasonModel.findByIdAndUpdate(id, { $set: updateParams })
        .lean()
        .then(console.log);
    return r;
}

//TODO: delete function needs to be protected for security reasons
export function __deleteReason(id) {
    let r = reasonModel.findByIdAndDelete(id)
        .lean()
        .then(console.log);
    return r;
}