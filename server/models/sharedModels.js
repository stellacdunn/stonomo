'use strict'
import mongoose from 'mongoose';

//regexes
const PHONE_REGEXP = /^(?:\d{3}-?){2}-?\d{4}$/;
const ZIP_REGEXP = /\d{5}/;

//static constants
const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
    'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'TT', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'
];

export const AddressSchema = new mongoose.Schema({
    street1: { type: String, select: true, required: true },
    street2: { type: String, select: true },
    street3: { type: String, select: true },
    city: { type: String, select: true, required: true },
    state: { type: String, select: true, required: true, enum: US_STATES },
    zip: { type: String, select: true, required: true, match: ZIP_REGEXP }
});

export const PhoneSchema = new mongoose.Schema({
    countryCode: { type: String, select: true, required: true, default: '1' },
    number: { type: String, select: true, required: true, match: PHONE_REGEXP },
    extension: { type: String, select: true }
}); //TODO: add setter to simplify phone number insertion