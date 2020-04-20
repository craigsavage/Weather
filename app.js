const express = require('express'),
      app     = express();

const https = require('https');

// Set templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Allow public access to paths for js, css, etc
app.use(express.static('public'))

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=812a0897dff7073fd0de02bdb7c87b01';

    https.get(url, (response) => {
        console.log('Status Code: ' + response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);

            const weather = {
                city: weatherData.name,
                icon: weatherData.weather[0].icon,
                temperature: weatherData.main.temp,
                feelsLike: weatherData.main.feels_like,
                weatherDesc: weatherData.weather[0].description
            };

            console.log(`City: ${weather.city}.`);
            console.log(`Temperature: ${weather.temperature} degrees Celcius.`);
            console.log(`Feels Like: ${weather.feelsLike} degrees Celcius.`);
            console.log(`${weather.weatherDesc}`);

            res.render('index', {weather: weather});
        });
    });
});

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server successfully started on port:', port);
});