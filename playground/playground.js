const request = require("request");
const fs = require("fs");
const path = require("path");


var geocodeAddress = (address) => {
  //returns promise

  return new Promise((resolve, reject) => {

    var inputs = fs.readFileSync(path.join(__dirname, "../..", "/weatherInputs.json"));
    inputs = JSON.parse(inputs);

    var encodedInputAddress = encodeURIComponent(address);

    request(
      {
        url: "http://www.mapquestapi.com/geocoding/v1/address?key="+inputs.MapQuestKey+"&location="+encodedInputAddress,
        json: true
      },
      (error, response, body) => {
        try {
          result = body.results[0].locations[0].latLng;
          resolve(result);
        } catch (error) {
          reject("Error: "+ error);
          //console.error(error);
        };
      }
    );
  });
};

console.log(geocodeAddress("test"));


geocodeAddress("@").then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
  }, (errorMessage) => {
    console.log(errorMessage)
  }
);
