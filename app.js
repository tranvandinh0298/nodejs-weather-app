const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address)   {
    console.log('Please provide a valid address');
}

// Geocoding
geocode(address, (error, {latitude, longitude, location, ...remainData} = {}) => {
    if (error) {
        return console.log(error);
    }
    // Weather
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(error);
        }
        console.log(location);
        console.log('It is currently ' + forecastData.current.temperature + ' degress out.');
    });
});
