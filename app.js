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

// Routes
app.get('/', (req, res) => {
    const weatherDisplay = false;
    res.render('index', {weatherDisplay: weatherDisplay});
});

app.post('/', (req, res) => {
    const weatherDisplay = true;
    const query = req.body.city;
    const apiKey = '812a0897dff7073fd0de02bdb7c87b01'; // This is a free api key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;

    https.get(url, (response) => {
        console.log('Status Code: ' + response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);

            const weather = {
                city: weatherData.name,     
                imageURL: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                temperature: weatherData.main.temp,
                feelsLike: weatherData.main.feels_like,
                humidity: weatherData.main.humidity,
                weatherDesc: weatherData.weather[0].description
            };
            res.render('index', {weather: weather, weatherDisplay: weatherDisplay});
        });
    });
    console.log(req.body.city)
});

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server successfully started on port:', port);
});