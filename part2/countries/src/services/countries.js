import axios from 'axios'
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"
const weatherAPI = "https://api.weatherapi.com/v1/current.json?key="
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const getAll = () => {
    const request = axios.get(`${baseURL}/all`);
    return request.then(response => response.data)
}

const weather = (capital) => {
    const request = axios.get(`${weatherAPI}${WEATHER_API_KEY}&q=${capital}&aqi=no`);
    return request.then(response => response.data)
}

export default { getAll, weather }