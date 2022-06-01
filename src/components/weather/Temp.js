import React, { useEffect, useState } from 'react'
import './style.css'
import Weathercard from './Weathercard';

const Temp = () => {

    const [searchValue, setSearchValue]= useState('Delhi');
    const [tempInfo, setTempInfo] = useState({})
    const getWeatherInfo= async()=>{
        try{
            let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=cd8952bc31d215c0d515188d4d95a98b` ;

            const res= await fetch(url);
            const data= await res.json();

            const {temp} = data.main;
            console.log(temp)

            const {humidity} = data.main;
            const {pressure} = data.main;

            const {main: weathermood} = data.weather[0]

            const {name} = data;

            const { speed} = data.wind;

            const {country }= data.sys;
            const {sunset} = data.sys;

            const myNewWeatherInfo ={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(myNewWeatherInfo);

            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
      getWeatherInfo();
    }, [])
    

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e)=>{setSearchValue(e.target.value)}}
                    />

                    <button
                        className="searchButton"
                        type="button"
                        onClick={getWeatherInfo}
                    >
                        Search
                    </button>
                </div>
            </div>
            <Weathercard tempInfo={tempInfo}/>
            
        </>

    )
}

export default Temp