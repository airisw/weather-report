"use strict";

const state = {
    increseTempControl: null,
    decreaseTempControl: null,
    tempValue: null,
    landscape: null,
    headerCityName: null,
    cityNameInput: null,
    // data
    temp: 72,
};

const loadControls = () => {
    state.increseTempControl = document.getElementById('increaseTempControl');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.tempValue = document.getElementById('tempValue');
    state.landscape = document.getElementById('landscape');
    state.headerCityName = document.getElementById('headerCityName');
    state.cityNameInput = document.getElementById('cityNameInput');
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

const registerEventHandlers = () => {
    state.increseTempControl.addEventListener('click', increaseTemp);
    state.decreaseTempControl.addEventListener('click', decreaseTemp);
    state.cityNameInput.addEventListener('input', updateCityName);
};

loadControls();
document.addEventListener('DOMContentLoaded', registerEventHandlers);