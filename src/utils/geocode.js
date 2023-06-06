const request = require('postman-request');

const geocode = (address, callback) => {
    const url = "http://api.positionstack.com/v1/forward?access_key=e2e146b42f88761dfa7b541b3672b094&query=" + encodeURIComponent(address);
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            });
        }
    });
}

module.exports = geocode;