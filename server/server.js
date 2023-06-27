'use strict'

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import * as Reason from './models/reasonModel.js';
import * as Eviction from './models/evictionModel.js';
import * as Tenant from './models/tenantModel.js';
import * as User from './models/userModel.js';
import * as Facility from './models/facilityModel.js';


console.log('Stonomo Server starting - ' + Date.now().toLocaleString());

//global consts
const PORT = 9000;

const connection = 'mongodb://db:27017/stonomo';
const connOpts = {};

console.log('Connecting to Mongo DB');

mongoose.connect(connection, connOpts).then(() => {
  console.log('successfully connected to the database');
}).catch(err => {
  console.log('error connecting to the database');
  console.log(err);
  process.exit();
});

console.log('Setting up Express server');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('static'));

console.log('Setting up route and param handlers');

app.param('user', (req, res, next, id) => {
  // try to get the user details from the User model and attach it to the request object
  console.log(`attempting to load user ${id}`);
  User.find(id, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});

app.post('/search', async (req, res, next) => {
  console.log('connecting to route POST "/search"');
  req.on('error', printErrorAndNext(next));
  // const { fname, mname, lname, street1, street2, street3, city, state, zip, birthdate, email, phone, ...otherFields } = req.body;

  //use Tenant.find() to search for people
  let tenantMatch = await Tenant.tenantModel.find(res.body); //refactor to Tenant.findTenant(res.body)
  console.log(typeof (tenantMatch));
  //Eviction.find({tenant: Tenant.find...})

  res.status(200).send(await tenantMatch.lean());
  next();
});

app.post('/eviction', async (req, res, next) => {
  console.log('connecting to route POST "/eviction"');
  next();
});

app.post('/tenant', async (req, res, next) => {
  console.log('connecting to route POST "/tenant"');
  next();
});

app.post('/user', async (req, res, next) => {
  console.log('connecting to route POST "/user"');
  next();
});

app.post('/facility', async (req, res, next) => {
  console.log('connecting to route POST "/facility"');
  next();
});

app.post('/admin', async (req, res, next) => {
  console.log('connecting to route POST "/admin"');
  next();
});

app.all('/*', (req, res) => {
  console.log('connecting to static route "/*"');
  res.status(200).sendFile(`/opt/stonomo/static${req.path}.html`);
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
