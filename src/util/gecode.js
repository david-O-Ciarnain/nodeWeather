const dotenv = require("dotenv");
const request = require("postman-request");

const envConfig = dotenv.config();
const env = process.env;

exports.gecode = function gecode(address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${env.ACCESS_TOKEN}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("No location was provaided", undefined);
    } else {
      const { center, place_name: location } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location,
      });
    }
  });
};
