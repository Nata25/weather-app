const request = require('request');

const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

let address;
const argv = yargs
.options({
  // address can be smth like 14108 Natalii Uzhvii Street 10 Kyiv Ukraine'  
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

geocode.geocodeAddress(argv.address)
.then(
  geoResults => {
    console.log(`Fetching weather for the address: ${geoResults.address}`);
    return weather.getWeather(geoResults.latitude, geoResults.longitude)
  },
  error => {
    console.log(error);
})
.then(
  weatherResults => {
    console.log(`It\'s currently ${weatherResults.temperature} but it feels like ${weatherResults.apparentTemperature}`);
},
  error => {
    console.log(error);
});