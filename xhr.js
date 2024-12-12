'use strict'


function getWeatherData(latitude, longitude) {
    let requestUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', requestUrl);

    xhr.onload = () => {
 
        let xhr_parse = JSON.parse(xhr.response);
        console.log(xhr_parse);

        console.log(`Широта: ${xhr_parse.latitude}, Долгота: ${xhr_parse.longitude}`);

        let temperatureElement = document.getElementById('temperature');
        temperatureElement.textContent = `${xhr_parse.current.temperature_2m} °C`;

        viewCity(latitude, longitude);
        
    };


    xhr.send();

    let today = new Date();
        
    let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    let formattedDate = today.toLocaleDateString('ru-RU', options);
    
    document.getElementById('date').textContent = `${formattedDate}`;
};

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            getWeatherData(latitude, longitude);
        }, error => {
            console.error('Ошибка получения геолокации:', error.message);
        });
    } else {
        console.error('Геолокация не поддерживается вашим браузером.');
    }
}

function viewCity(latitude, longitude) {
    let cityUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', cityUrl);

    xhr.onload = () => {

        let locationData = JSON.parse(xhr.response);
        console.log(locationData);
            
        let cityElement = document.getElementById('city');
        cityElement.textContent = locationData.address.city || locationData.address.town || locationData.address.village || "Город не найден";
    };

    xhr.send();
}


getGeolocation();
setInterval(getGeolocation, 300000);



