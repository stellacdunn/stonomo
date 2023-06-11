'use strict'
import mongoose from 'mongoose';

//TODO: add indexing
const reasonSchema = new mongoose.Schema({
	label: String,
	desc: String
});

export const Reason = mongoose.model('Reason', reasonSchema);