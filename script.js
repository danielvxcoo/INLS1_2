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

function getNextHolidays() {
    const holidays = [
        { date: '2026-01-01', name: 'Nowy Rok', desc: 'Pierwszy dzień roku' },
        { date: '2026-01-12', name: 'Dzień Pełnoletności', desc: 'Osoby kończące 20 lat' },
        { date: '2026-02-11', name: 'Dzień Założenia Państwa', desc: 'Rocznica założenia Japonii' },
        { date: '2026-02-23', name: 'Urodziny Cesarza', desc: 'Urodziny cesarza Naruhito' },
        { date: '2026-03-20', name: 'Dzień Równonocy Wiosennej', desc: 'Początek wiosny' },
        { date: '2026-04-29', name: 'Dzień Shōwa', desc: 'Urodziny cesarza Shōwa' },
        { date: '2026-05-03', name: 'Dzień Konstytucji', desc: 'Rocznica konstytucji' },
        { date: '2026-05-04', name: 'Dzień Zieleni', desc: 'Święto natury' },
        { date: '2026-05-05', name: 'Dzień Dziecka', desc: 'Święto dzieci' },
        { date: '2026-07-20', name: 'Dzień Morza', desc: 'Święto morza' },
        { date: '2026-08-11', name: 'Dzień Gór', desc: 'Święto gór' },
        { date: '2026-09-21', name: 'Dzień Szacunku dla Starszych', desc: 'Święto osób starszych' },
        { date: '2026-09-23', name: 'Dzień Równonocy Jesiennej', desc: 'Początek jesieni' },
        { date: '2026-10-12', name: 'Dzień Sportu', desc: 'Święto sportu' },
        { date: '2026-11-03', name: 'Dzień Kultury', desc: 'Święto kultury' },
        { date: '2026-11-23', name: 'Dzień Dziękczynienia za Pracę', desc: 'Święto pracy' }
    ];
    
    const today = new Date();
    const future = [];
    
    for (let i = 0; i < holidays.length; i++) {
        const holidayDate = new Date(holidays[i].date);
        if (holidayDate >= today) {
            future.push(holidays[i]);
        }
    }
    
    future.sort((a, b) => new Date(a.date) - new Date(b.date));

    return future.slice(0, 3);
}

function showHolidays() {
    const box = document.getElementById('holidaysBox');
    const holidays = getNextHolidays();
    
    if (holidays.length === 0) {
        box.innerHTML = '<p>Brak nadchodzących świąt</p>';
        return;
    }
    
    let html = '';
    
    for (let i = 0; i < holidays.length; i++) {
        const holiday = holidays[i];
        const date = new Date(holiday.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        html += `
            <div class="holiday-simple">
                <div class="holiday-date-simple">${day}.${month}.${year}</div>
                <div class="holiday-name-simple">${holiday.name}</div>
                <div class="holiday-desc-simple">${holiday.desc}</div>
            </div>
        `;
    }
    
    box.innerHTML = html;
}
window.addEventListener('DOMContentLoaded', function() {
    showHolidays();
});