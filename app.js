const express = require('express'),
      app     = express();

const https = require('https');

app.get('/', (req, res) => {
    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=812a0897dff7073fd0de02bdb7c87b01';
    // https.get(url, (response) => {
    //     console.log('Status Code: ' + response.statusCode);

    //     response.on('data', (data) => {
    //         const weatherData = JSON.parse(data);

    //         const city = weatherData.name;
    //         const temperature = weatherData.main.temp;
    //         const feelsLike = weatherData.main.feels_like;
    //         const weatherDesc = weatherData.weather[0].description;

    //         console.log(`City: ${city}.`);
    //         console.log(`Temperature: ${temperature} degrees Celcius.`);
    //         console.log(`Feels Like: ${feelsLike} degrees Celcius.`);
    //         console.log(`${weatherDesc}`);
    //     })
    // })

    res.sendFile(__dirname + '/index.html');
});

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server successfully started on port:', port);
});