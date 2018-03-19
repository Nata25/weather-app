const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');

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

// address can be smth like 14108 Natalii Uzhvii Street 10 Kyiv Ukraine'
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});