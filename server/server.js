"use strict"
//imports
import mongoose from "mongoose";
import("./facilityModel.js");
import("./userModel.js");
import("./tenantModel.js");
import("./evictionModel.js");
import { populateReasons } from "reasons.js"

//global constants
const http = include("http");

console.log("Stonomo Server starting - " + Date.now());

console.log("Connecting to Mongo DB");

const conn = mongoose.connect("mongodb://db:27017/stonomo");

console.log("Populating eviction reasons");
const reasons = await populateReasons();

console.log("Reasons:");
console.log(reasons);

console.log("Starting web server");
const server = http.createServer();

server.on('post', (req, res) => {
    //handle POST
    const { method, url, headers } = req;
    const userAgent = headers['user-agent'];

    let body = [];
    request.on('error', (err) => {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        
        res.writeHead(200, {"Content-Type": "text/plain"});

        const responseBody = { headers, method, url, body };

        res.end(JSON.stringify(responseBody));
    });
}).listen(8080);

console.log("Stonomo Server stopping - " + Date.now());