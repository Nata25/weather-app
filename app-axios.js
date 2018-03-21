const axios = require('axios');
const yargs = require('yargs');
const t = require('./helpers/temperature.js');

const mapsKey = 'AIzaSyC1Snx7sxW_urBAP72fC1WUgPWbAJqjvgs';
const forecastKey = '8f1c05048582fc43c8c3d2c954781830';

const argv = yargs
.options({
  a: {
    demand: false,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true,
    default: 'Kiev Ukraine'
  }
})
.help()
.alias('help', 'h')
.argv;

const address = encodeURIComponent(argv.address);

const getData = () => {
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
    const temperature = Math.round(t.convertToCelsius(response.data.currently.temperature));
    const apparentTemperature = Math.round(t.convertToCelsius(response.data.currently.apparentTemperature));
    console.log(`It\'s currently ${temperature} and it feels like ${apparentTemperature}`);
  })
  .catch(e => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API service.');
    } else {
      console.log(e.message);
    }
  });
}

if (address.length) {
  getData();
} else {
  console.log('The address is not specified.');
}