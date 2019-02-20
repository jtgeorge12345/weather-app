const request = require("request");
const fs = require("fs");
const path = require("path")

/*
My API key and location are in a file in the parent directory so that they are
not uploaded to Github
*/
var inputs = fs.readFileSync(path.join(__dirname, "..", "/weatherInputs.json"));
inputs = JSON.parse(inputs);


request(
  {
    url: "http://www.mapquestapi.com/geocoding/v1/address?key="+inputs.MapQuestKey+"&location="+inputs.inputLocation,
    json: true
  },
  (error, response, body) => {
    console.log(body.results[0].locations[0].latLng);
    console.log("====================");
    console.log(JSON.stringify(body, undefined, 2));
  }
)
