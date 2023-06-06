const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const particalsPath = path.join(__dirname, '../templates/particals');

// Setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(particalsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get(['/', '/index', '/home'], (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: 'Tran Dinh',
    });
});

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if (!address) {
        console.log('address is required');
        return res.send({
            error: 'You must provide a address'
        });
    }
    // Geocoding
    geocode(address, (error, { latitude, longitude, location, ...remainData } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        // Weather
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                address,
                forecast: 'It is currently ' + forecastData.current.temperature + ' degress out.',
                location,
                latitude,
                longitude,
            });
        });
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Tran Dinh',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Tran Dinh',
    });
});

app.get('/help/*', (req, res) => {
    res.send('Help article not found');
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Tran Dinh',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});