const request = require('request');
const key = 'AIzaSyC1Snx7sxW_urBAP72fC1WUgPWbAJqjvgs';

module.exports.geocodeAddress = (rawAddress, callback) => {
  const address = encodeURIComponent(rawAddress);
  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address +
    "&key=" + key,
    json: true,
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    if (error) {
      callback('Unable to connect to Google service');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    }
  });
}