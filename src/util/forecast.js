const dotenv = require("dotenv");
const request = require("postman-request");

const envConfig = dotenv.config();
const env = process.env;

exports.forecast = function forecast(longitude, latitude, callback) {
  const url = `https://api.weatherstack.com/current?access_key=${
    env.API_KEY
  }&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weatherStack", undefined);
    } else if (body.error) {
      callback("Can't get location", undefined);
    } else {
      const {
        temperature,
        feelslike,
        weather_descriptions: weatherDescriptions,
        weather_icons: weatherIcons,
      } = body.current;

      callback(undefined, {
        weather: {
          description:weatherDescriptions[0],
          temperature: `Temperature: ${temperature} degrees.`,
          feelslike: `Feelslike: ${feelslike} degrees.`,
        },
        weatherIcons: weatherIcons[0],
      });
    }
  });
};
