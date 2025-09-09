import { useEffect, useState } from "react"
import weatherService from "../services/weather"
import weather from "../services/weather"

export default ({ country }) => {
    const [wind, setWind] = useState("")
    const [temprature, setTemprature] = useState("")
    const [icon, setIcon] = useState("")
    useEffect(() =>{
        weatherService.getWeather(country.capital[0])
            .then(weather => {
                setTemprature(weather.main.temp)
                setWind(weather.wind.speed)
                setIcon(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
            })
    })
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>

            <h1>Languages</h1>
            <ul>
                {
                    Object.values(country.languages).map(language => <li key={language}>{language}</li>)
                }
            </ul>
            <img src={country.flags.png}  alt={country.flags.alt}/>

            <h1>Weather in {country.capital[0]}</h1>
            {
                temprature? <p>temprature - {temprature} Celsius</p> : ""
            }
            {
                icon ? <img src={icon} style={{ width: "200px", height: "auto" }}  /> : ""
            }
            {
                wind ? <p>Wind {wind} m/s</p> : ""
            }
        </div>
    )
}