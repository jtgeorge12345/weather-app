const yargs = require("yargs");
const geocode = require('./geocode/geocode.js');
const request = require('request');
const weather = require('./weather/weather');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address for which to fetch the weather",
      string: true
    }
  })
  .help()
  .alias("help", "h")
  .argv;

var inputs = fs.readFileSync(path.join(__dirname, "..", "/weatherInputs.json"));
inputs = JSON.parse(inputs);

var encodedInputAddress = encodeURIComponent(argv.address);
var geocodeURL = "http://www.mapquestapi.com/geocoding/v1/address?key="+inputs.MapQuestKey+"&location="+encodedInputAddress;

axios.get(geocodeURL).then((response) => {
  console.log("=====================\n=====================");
  console.log(JSON.stringify(response.data, undefined, 2));

  var lat =  response.data.results[0].locations[0].latLng.lat;
  var lng =  response.data.results[0].locations[0].latLng.lng;

  console.log(lat, lng);
  var weatherURL = `https://api.darksky.net/forecast/46af66b3219e15d42007358dbeaac0f8/${lat},${lng}`;

  return axios.get(weatherURL);


}).then((response) => {
  console.log("Weather is currently:", response.data.currently);
}).catch((e) => {
  //if statements to create errors
  console.log("error:", e)
});
