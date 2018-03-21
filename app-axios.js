const axios = require('axios');

const yargs = require('yargs');
const mapsKey = 'AIzaSyC1Snx7sxW_urBAP72fC1WUgPWbAJqjvgs';
const forecastKey = '8f1c05048582fc43c8c3d2c954781830';

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

const address = encodeURIComponent(argv.address);
axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsKey}`)
.then(response => {
  if (response.data.status === 'ZERO_RESULT') {
    throw new Error('Unable to find that address.');
  }
  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  console.log(`Fetching weather for the address: ${response.data.results[0].formatted_address}...`);
  return axios.get(`https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`);
})
.then(response => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It\'s currently ${temperature} but it feels like ${apparentTemperature}`);
})
.catch(e => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API service.');
  } else {
    console.log(e.message);
  }
});