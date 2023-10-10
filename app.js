const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather');

const timezone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForecastE1 =   document.getElementById('weather-forcast');
const currentTempE1 = document.getElementById('current-temp');

const days=['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];

const months = ['Jan' , 'Feb' , 'Mar' , 'Apr' ,'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'];

const API_KEY='0f372af324123736bd5fb24efd961de6';



setInterval(()=> {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormet = hour >= 13 ? hour%12 : hour ;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' :'AM' ;
    timeE1.innerHTML = (hoursIn12HrFormet < 10? '0' + hoursIn12HrFormet : hoursIn12HrFormet) +':' + (minutes < 10 ? '0'+minutes :minutes)+''+`<span id="am-pm">${ampm}</span>`

    dateE1.innerHTML = days[day] + ',' + date + ' ' + months[month];

},1000);

getWeatherData();

function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success); 
        
        let{latitude
            ,longitude} = success.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        });


        
    })
}

function showWeatherData (data) {
    let {humidity , pressure ,temp_max , temp_min
    } = data.main;
    let {icon , main} = data.weather[0];
    let {speed} = data.wind;
    let {sunrise , sunset} = data.sys;

    timezone.innerHTML = data.name;
    countryE1.innerHTML = data.sys.country;

    currentWeatherItemsE1.innerHTML = `
    <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
    </div>
    <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Wind Speed</div>
    <div>${speed}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>
`;
const time = new Date();
const day = time.getDay();
currentTempE1.innerHTML =`<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="weather icon" class="w-icon">
<div class="others">
    <div class="day">${days[day]}</div>
    <div class="temp">Min_Temp  - ${temp_min}&#176; C</div>
    <div class="temp">Max_Temp - ${temp_max}&#176; C</div>
</div>`
}


 