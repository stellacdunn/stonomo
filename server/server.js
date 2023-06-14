'use strict'

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import * as Reason from './models/reasonModel'
import * as Eviction from './models/evictionModel';
import * as Tenant from './models/tenantModel';
import * as User from './models/userModel';
import * as Facility from './models/facilityModel';

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

router.param('user', function (req, res, next, id) {
    // try to get the user details from the User model and attach it to the request object
    User.find(id, function (err, user) {
      if (err) {
        next(err)
      } else if (user) {
        req.user = user
        next()
      } else {
        next(new Error('failed to load user'))
      }
    })
  })

app.get('/', (req, res) => {
    console.log('connecting to route route "/"');
    res.status(200).send('Stonomo server');
});

app.post('/search', (req, res, next) => {
    const { fname, mname, lname, street1, street2, city, state, zip, birthdate, email, phone, ...otherFields } = req.body;

    //use Tenant.find to search for people
    //Eviction.find({tenant: Tenant.find...})

    req.on('error', printErrorAndNext(next));
});

console.log('Populating eviction reasons');
const reasons = await Reason.populateReasons();

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
