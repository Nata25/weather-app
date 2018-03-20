const request = require('request');
const forecastKey = '8f1c05048582fc43c8c3d2c954781830';

module.exports.getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`,
      json: true,
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        reject('Unable to connect to forecast service.')
      }
    });
  });
}