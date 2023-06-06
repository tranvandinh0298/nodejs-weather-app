const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0623e1f0f1579c3993f70a1a18bdfde8&query=" + latitude + "," + longitude;
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                current: body.current
            });
        }
    });
}

module.exports = forecast;