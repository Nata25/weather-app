const request = require('request');

const key = 'AIzaSyC1Snx7sxW_urBAP72fC1WUgPWbAJqjvgs';

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20Lompard%20street%206philadelphia' +
  "&key=" + key,
  json: true,
}, (error, response, body) => {
  // console.log(JSON.stringify(body, undefined, 2));
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
})