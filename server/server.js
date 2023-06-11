'use strict'

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import * as reason from './models/reasonsModel'
import * as eviction from './models/evictionModel';
import * as tenant from './models/tenantModel';
// import * as facility from './models/facilityModel';
// import * as user from './models/userModel';

console.log('Stonomo Server starting - ' + Date.now());

//global consts
const PORT = 8080;
const app = express();

console.log('Connecting to Mongo DB');
const connection = 'mongodb://db:27017/stonomo';
const connOpts = {};

mongoose.connect(connection, connOpts).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log('error connecting to the database');
    console.log(err);
    process.exit();
});

console.log('Setting up Express server');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('connecting to route route "/"');
    res.status(200).send('Stonomo server');
});

app.post('/search', (req, res, next) => {
    const { fname, mname, lname, street1, street2, city, state, zip, birthdate, email, phone, ...otherFields } = req.body;

    //use tenant.find to search for people
    //eviction.find({tenant: tenant.find...})

    req.on('error', printErrorAndNext(next)
    );
});

console.log('Populating eviction reasons');
const reasons = await reason.populateReasons();

//Populate tables
console.log('Loaded eviction reasons:');
console.log(reasons);

console.log(`Listening on port ${PORT}`);
app.listen(PORT);

console.log('Stonomo Server stopping - ' + Date.now());

function printErrorAndNext(next) {
    return (err) => {
        console.error(err.message);
        console.error(err.stack);
        next();
    };
}
