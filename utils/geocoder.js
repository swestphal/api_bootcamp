const nodeGeocoder = require('node-geocoder')
require('dotenv').config({
    path: './../config/config.env',
});
console.log(process.env)
const options = {
    provider: process.env.GEOCODE_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODE_API_KEY,
    formatter: null
}

const geocoder = nodeGeocoder(options)

module.exports = geocoder