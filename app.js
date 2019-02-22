const yargs = require("yargs");
const geocode = require('./geocode/geocode.js');
const request = require('request');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (error, response) => {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(response, undefined, 2));
    weather.getWeather(response.lat, response.lng, (errorMessage, result) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log("Current temperature is:", result.temperature);
        console.log("Feels like:", result.apparentTemperature);
        console.log("Wind Speed:", result.windSpeed);
        console.log("Chance of precipitation", result.precipProbability);
      }
    });
  }
});

// pass in lat, long, callback(errorMessage, Result);
