'use strict'

let requestUrl = 'https://api.open-meteo.com/v1/forecast?latitude=56.3269&longitude=44.0059&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';
function getWeatherData() {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', requestUrl);

    xhr.onload = () => {
        let xhr_parse = JSON.parse(xhr.response);

        console.log(xhr_parse);

        let temperatureElement = document.getElementById('temperature');

        temperatureElement.textContent = `${xhr_parse.current.temperature_2m} °C`;

        if(xhr_parse.current.temperature_2m > 0) {
            let img = document.getElementById('img');
            img.src = './sun.png';
        }
    }

    xhr.send();

    let today = new Date();
        
    let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    let formattedDate = today.toLocaleDateString('ru-RU', options);
    
    document.getElementById('date').textContent = `${formattedDate}`;
};




getWeatherData();
setInterval(getWeatherData,30000)

