const Weather = ({weather}) =>{
    return(
        <>
        <p>Temperature: {weather.main.temp} °C</p>
         <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={`${weather.weather[0].main} weather`}/>
         <br/>
         <p>Wind: {weather.wind.speed} m/s</p>
        </>
    )
}

export default Weather