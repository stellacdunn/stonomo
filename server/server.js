'use strict'

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { populateReasons } from './handlers/reasonsHandler'
// import { Eviction} from './models/evictionModel';
// import { Tenant } from './models/tenantModel';
// import('./facilityModel.js');
// import('./userModel.js');

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
    //handle POST at /search

    const searchRequest = {
        //use Tenant.find to search for people
        //Evictions.find({tenant: Tenant.find...})
    }

    req.on('error', printErrorAndNext(next)
    );
});

console.log('Populating eviction reasons');
const reasons = await populateReasons();

//Populate tables
console.log('Reasons:');
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
