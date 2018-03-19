const request = require('request');
const yargs = require('yargs');

const key = 'AIzaSyC1Snx7sxW_urBAP72fC1WUgPWbAJqjvgs';
let address;
const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true,
  }
})
.help()
.alias('help', 'h')
.argv;

address = encodeURIComponent(argv.address);
// can be smth like 14108 Natalii Uzhvii Street 10 Kyiv Ukraine'

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address +
  "&key=" + key,
  json: true,
}, (error, response, body) => {
  // console.log(JSON.stringify(body, undefined, 2));
  if (error) {
    console.log('Unable to connect to Google service');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('Unable to find the address');
  } else if (body.status === 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
  }
});