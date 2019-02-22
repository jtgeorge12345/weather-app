const request = require("request");

var getWeather = (lat, long, callback) => {
  console.log("coordinates", lat, long)

  request({
    url:`https://api.darksky.net/forecast/46af66b3219e15d42007358dbeaac0f8/${lat},${long}`,
    json:true
  }, (error, response, body) => {
    try{
      callback(undefined, response.body.currently);
    } catch (error) {
      callback("Something went wrong with the DarkSky API call");
    }

  });
};


module.exports.getWeather = getWeather;
