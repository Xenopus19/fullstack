import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Weather from "./Weather"

const Country = ({country, shouldShow}) => {
    const [isShown, setShown] = useState(shouldShow)
    const [weather, setWeather] = useState({})

    useEffect(()=>{
        const api_key = import.meta.env.VITE_WEATHER_KEY
        console.log(api_key)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`).then(
            response => {
                setWeather(response.data)
                console.log(response.data)
            }
        )
    }, [])

    useEffect(() => {
        setShown(shouldShow)
    }, [shouldShow])

    if(!isShown)
    {
        return(
        <>
        <p>{country.name.common}</p>
        <button onClick={()=>setShown(!isShown)}>show</button>
        </>
       )
    }
    const languages = Object.values(country.languages)

    return(
        <>
         <h2>{country.name.common}</h2>
         <p>Capital: {country.capital}</p>
         <p>Area: {country.area}</p>
         <h3>Languages</h3>
         <ul>{languages.map(language => <li key = {language}>{language}</li>)}</ul>
         <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
         <h3>Weather in {country.capital}</h3>
         <Weather weather={weather}/>
         <button onClick={()=>setShown(!isShown)}>hide</button>
        </>
    )

    
}

const Countries = ({countries, search}) => {
    const filteredCountries = countries.filter(country => country.name.common.startsWith(search))
    if(filteredCountries.length>10)
    {
        return(
            <p>Too many matches, specify another filter</p>
        )
    }
    return(
        <>
        {filteredCountries.map(country => {
            return <Country key={country.name.common} country={country} shouldShow={filteredCountries.length===1}/>
        })}
        </>
    )
}

export default Countries