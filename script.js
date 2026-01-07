const buttons = document.querySelectorAll(".accordion_button");
const arrows = document.querySelectorAll(".fa-chevron-down");

function openItem() {
    if (this.nextElementSibling.classList.contains('active_accordion_box')) {
        this.nextElementSibling.classList.remove('active_accordion_box');
        this.lastElementChild.classList.remove('active_accordion_btn')
    } else {
        closeItem();
        this.nextElementSibling.classList.toggle('active_accordion_box');
        this.lastElementChild.classList.toggle('active_accordion_btn');
    }

}




const closeItem = () => {
    const allActiveItems = document.querySelectorAll('.info');
    allActiveItems.forEach(item => {
        item.classList.remove('active_accordion_box')
    })
    arrows.forEach(arrow => {
        arrow.classList.remove('active_accordion_btn');
    })
}


buttons.forEach(btn => {
    btn.addEventListener('click', openItem)
})

//--------------------------------------------------------------------------------------//
// obsługa API //
const sunrise_hour = document.querySelector('p.sunrise_hour');
const sunset_hour = document.querySelector('p.sunset_hour');
const weatherImg = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const weatherDescription = document.querySelector('p.weather_description');
const feels_like = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');

const apiInfo = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q=',
    city : 'Tokio',
    key : '&appid=1ae3e632ec01d7ccea34f59598c39440',
    units : '&units=metric',
    lang : '&lang=pl',
}

const API_URL = `${apiInfo.link}${apiInfo.city}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
//console.log(API_URL);

function getWeatherData() {
    axios.get(API_URL).then((response) => {
        console.log(response.data);
        const sunrise = response.data.sys.sunrise;
        const sunset = response.data.sys.sunset;
        const timezone = response.data.timezone;
        const localSunrise = new Date((sunrise + timezone) * 1000);
        const localSunset = new Date((sunset + timezone) * 1000);
        
        const sunriseTime = localSunrise.toLocaleString('jp-JP' , {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        })

        const sunsetTime = localSunset.toLocaleString('jp-JP' , {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        })

        sunset_hour.textContent = sunsetTime;
        sunrise_hour.textContent = sunriseTime;
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.round(response.data.main.temp)}°C`;
        weatherDescription.textContent = `${response.data.weather[0].description}`;
        feels_like.textContent = `${Math.round(response.data.main.feels_like)}°C`;
        pressure.textContent = `${response.data.main.pressure}Hpa`;
        humidity.textContent = `${response.data.main.humidity}%`;
        windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)}km/h`;
        clouds.textContent = `${response.data.clouds.all}%`;
        visibility.textContent = `${response.data.visibility / 1000}km`;
    })
}

getWeatherData();