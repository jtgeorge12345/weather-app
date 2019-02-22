const request = require("request");
const fs = require("fs");
const path = require("path");



var geocodeAddress = (addressString, callback) => {
  /*
  My API key and location are in a file in the parent directory so that they are
  not uploaded to Github
  */
  var inputs = fs.readFileSync(path.join(__dirname, "../..", "/weatherInputs.json"));
  inputs = JSON.parse(inputs);

  var encodedInputAddress = encodeURIComponent(addressString);

  request(
    {
      url: "http://www.mapquestapi.com/geocoding/v1/address?key="+inputs.MapQuestKey+"&location="+encodedInputAddress,
      json: true
    },
    (error, response, body) => {

      if (error){
        callback("Couldn't reach server");
      } else {
        try {
          callback(undefined, body.results[0].locations[0].latLng)
        } catch (error) {
          callback("Something went wrong with the response")
          //console.error(error);
        };
      };
    }
  );

};

module.exports = {geocodeAddress};
