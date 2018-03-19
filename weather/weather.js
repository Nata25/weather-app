const request = require('request');
const forecastKey = '8f1c05048582fc43c8c3d2c954781830';

module.exports.getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to connect to forecast service.')
    }
  });
}