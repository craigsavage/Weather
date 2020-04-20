const express = require('express'),
      app     = express();

const https = require('https');

app.get('/', (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=812a0897dff7073fd0de02bdb7c87b01';
    https.get(url, (response) => {
        console.log('Status Code: ' + response.statusCode);

        response.on('data', (data) => {
            let weatherData = JSON.parse(data);

            let temperature = weatherData.main.temp;
            let feelsLike = weatherData.main.feels_like;

            console.log(temperature);
            console.log(feelsLike);
        })
    })

    res.sendFile(__dirname + '/index.html');
});

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server successfully started on port:', port);
});