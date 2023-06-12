"use strict";

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
    landscape: null,
    headerCityName: null,
    cityNameInput: null,
    currentTempButton: null,
    skySelect: null,
    sky: null,
    cityNameReset: null,
    // data
    temp: 72,
    cityName: 'Seattle',
};

const loadControls = () => {
    for (const element in state) {
        if (state[element] === null) {
            state[element] = document.getElementById(String(element));
        }
    }
};

const changeTempColor = () => {
    if (state.temp >= 80) {
        state.tempValue.setAttribute('class', 'red');
    } else if (state.temp >= 70 && state.temp <= 79) {
        state.tempValue.setAttribute('class', 'orange');
    } else if (state.temp >= 60 && state.temp <= 69) {
        state.tempValue.setAttribute('class', 'yellow');
    } else if (state.temp >= 50 && state.temp <= 59) {
        state.tempValue.setAttribute('class', 'green');
    } else {
        state.tempValue.setAttribute('class', 'teal');
    }
};

const increaseTemp = () => {
    state.temp += 1;
    state.tempValue.textContent = state.temp;
    changeTempColor();
    changeLandscape();
};

const decreaseTemp = () => {
    state.temp -= 1;
    state.tempValue.textContent = state.temp;
    changeTempColor();
    changeLandscape();
};

const changeLandscape = () => {
    if (state.temp >= 80) {
        state.landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (state.temp >= 70 && state.temp <= 79) {
        state.landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (state.temp >= 60 && state.temp <= 69) {
        state.landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else {
        state.landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};

const updateCityName = () => {
    state.headerCityName.textContent = state.cityNameInput.value;
};

const convertTemp = temp => {
    return Math.round(1.8 * (temp - 273.15) + 32);
};

const getLocation = (city) => {
    return axios.get('http://localhost:5000/location', {params: {q:city}})
        .then(response => {
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            return {lat, lon}
        })
        .catch(err => {
            console.log(err);
        });
};

const getWeather = (coordinates) => {
    return axios.get('http://localhost:5000/weather', {params: {lat: coordinates.lat, lon: coordinates.lon}})
        .then(response => {
            state.temp = convertTemp(response.data.main.temp);
            state.tempValue.textContent = state.temp;
            changeTempColor();
            changeLandscape();
        })
        .catch(err => {
            console.log(err);
        });
}

const getCurrentTemp = () => {
    getLocation(state.cityNameInput.value)
    .then((lat, lon) => {
        getWeather(lat, lon);
    })
}

const changeSky = () => {
    if (state.skySelect.value === 'sunny') {
        state.sky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (state.skySelect.value === 'cloudy') {
        state.sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    } else if (state.skySelect.value === 'rainy') {
        state.sky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else {
        state.sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
};

const resetCity = () => {
    state.cityName = 'Seattle';
    state.cityNameInput.value = 'Seattle';
    state.headerCityName.textContent = 'Seattle';
};

const registerEventHandlers = () => {
    state.increaseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
    state.cityNameInput.addEventListener('input', updateCityName);
    state.currentTempButton.addEventListener('click', getCurrentTemp);
    state.skySelect.addEventListener('change', changeSky);
    state.cityNameReset.addEventListener('click', resetCity);
};

loadControls();
console.log(state);
document.addEventListener('DOMContentLoaded', registerEventHandlers);