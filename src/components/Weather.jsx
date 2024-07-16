import React, { useEffect, useRef }from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import { useState } from 'react'




export const Weather = () => {

    const [weatherData, setweatherData] = useState(false)
    const refValue = useRef();
    const totalIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "11d": rain_icon,
        "11n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
    const search = async (city) =>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const apiKey = "4236482e7f3a5fbe126eb64324479478";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const icon = totalIcons[data.weather[0].icon] || clear_icon; 
            setweatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        } catch (error) {
            setweatherData(false);
            console.error("Error in Fetching Data");
        }
        
    }


    useEffect(() => {
      search("Karachi");
    
    }, [])
    
  return (
    <>
    <div className="weather">
        <div className="input-box">
            <input ref={refValue} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=> search(refValue.current.value)} />
        </div>

        {weatherData?<>
        <div className="box">
            <img src={weatherData.icon} alt="" className='weather-icon'/>
            <p className='temperature'>{weatherData.temp}°c</p>
            <p className='location'>{weatherData.location}</p>
        </div>

        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <span>{weatherData.humidity}%</span>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <span>{weatherData.windSpeed} Km/h</span>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
    </>
  )
}
