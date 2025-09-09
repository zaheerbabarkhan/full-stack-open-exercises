import axios from "axios"


const getWeather = (name) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)

    return request.then(response => response.data)
}


export default {
    getWeather
}