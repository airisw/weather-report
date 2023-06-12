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
    gardenContent: null,
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
        document.body.style.backgroundColor = '#b21e35';
        state.currentTempButton.style.backgroundColor = '#b21e35';
        state.cityNameReset.style.backgroundColor = '#b21e35';
    } else if (state.temp >= 70 && state.temp <= 79) {
        state.tempValue.setAttribute('class', 'orange');
        document.body.style.backgroundColor = '#de6b48';
        state.currentTempButton.style.backgroundColor = '#de6b48';
        state.cityNameReset.style.backgroundColor = '#de6b48';
    } else if (state.temp >= 60 && state.temp <= 69) {
        state.tempValue.setAttribute('class', 'yellow');
        document.body.style.backgroundColor = '#e9c46a';
        state.currentTempButton.style.backgroundColor = '#e9c46a';
        state.cityNameReset.style.backgroundColor = '#e9c46a';
    } else if (state.temp >= 50 && state.temp <= 59) {
        state.tempValue.setAttribute('class', 'green');
        document.body.style.backgroundColor = '#4c956c';
        state.currentTempButton.style.backgroundColor = '#4c956c';
        state.cityNameReset.style.backgroundColor = '#4c956c';
    } else {
        state.tempValue.setAttribute('class', 'teal');
        document.body.style.backgroundColor = '#40919c';
        state.currentTempButton.style.backgroundColor = '#40919c';
        state.cityNameReset.style.backgroundColor = '#40919c';
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
        state.gardenContent.setAttribute('class', 'garden__content sunny');
    } else if (state.skySelect.value === 'cloudy') {
        state.sky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
        state.gardenContent.setAttribute('class', 'garden__content cloudy');
    } else if (state.skySelect.value === 'rainy') {
        state.sky.textContent = '🌧🌈⛈️🌧🌧💧⛈️🌧🌦🌧💧🌧🌧';
        state.gardenContent.setAttribute('class', 'garden__content rainy');
    } else {
        state.sky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
        state.gardenContent.setAttribute('class', 'garden__content snowy');
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
document.addEventListener('DOMContentLoaded', registerEventHandlers);