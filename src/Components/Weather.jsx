import {useState,useEffect} from 'react'
import searchIcon from '../assets/searchIcon.png'
import HumidityIcon from "../assets/humidity.png"
import windSpeedIcon from "../assets/wind Speed.png"
import clearday from "../assets/clearday.png"
import clearnight from "../assets/clearnight.png"
import cloudskyday from "../assets/cloudskyday.png"
import cloudskynight from "../assets/cloudskynight.png"
import rainday from "../assets/rain day.jpeg"
import rainnight from "../assets/rain night.png"
import thunderstromday from "../assets/thunderstromday.png"
import thunderstromnight from "../assets/thunderstrom night.jpeg"
import snow from "../assets/snow.png"

const Weather = () => {
    const apikey = "5f75c3d504257a689ccb764c0fc0bd24";
    const [searchCity,setsearchCity]=useState("Coimbatore");
    const [longtitude,setlongtitude]=useState(0);
    const [lattitude,setlattitude]=useState(0);
    const [Country,setCountry]=useState("");
    const [City,setCity]=useState("");
    const [Temp,setTemp]=useState(0);
    const [Humidity,setHumidity]=useState(0);
    const [windSpeed,setwindspeed]=useState(0);
    const [loading,setloading]=useState(false);
    const [error,setError]=useState(false);
    const [Icon,setIcon]=useState(clearday);

    const imagemap={
    "01d":clearday,
    "02d":cloudskyday,
    "03d":cloudskyday,
    "04d":cloudskyday,
    "09d" :rainday,
    "10d" :rainday,
    "11d" :thunderstromday,
    "13d" :snow,
    "50d":windSpeedIcon,
    "01n":clearnight,
    "02n":cloudskynight,
    "03n":cloudskynight,
    "04n":cloudskynight,
    "09n" :rainnight,
    "10n" :rainnight,
    "11n" :thunderstromnight,
    "13n" :snow,
    "50n":windSpeedIcon,
    }
    async function search(){
        setloading(true);
        setError(false);
        try{
             const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apikey}&units=Metric`);
            const data=await res.json();
            if(data.cod=="400"){
                setError(true);
                setloading(false);
                return;
            }
            setIcon(imagemap[data.weather[0].icon]|| clearday);
            setlattitude(data.coord.lat);
            setlongtitude(data.coord.lon);
            setCountry(data.sys.country);
            setCity(data.name);
            setTemp(Math.floor(data.main.temp));
            setHumidity(data.main.humidity);
            setwindspeed(data.wind.speed);
        }
        catch{
            console.log("error");
            setError(true)
        }
        finally{
            setloading(false);
        }
    }
    useEffect(function(){
        search();
    },[])
    function handle(e){
    if(e.key=="Enter"){
       search();
        }
    }
    function handlesearch(e){
       search();
    }
    function handleset(e){
        setsearchCity(e.target.value)
    }
  return (
    <div className='weather'>
      <div className='Search'>
        <input type='text'  placeholder='Enter City' onChange={handleset} onKeyDown={handle}/>
        <img src={searchIcon} alt="SearchIcon" onClick={handlesearch}/>
      </div>
   {!error && <div className='weathercondition'>
       {!loading && <img src={Icon}/>}
       {loading && <p style={{
        textAlign:"center"
       }}>Loading...</p>}
      </div>}
    {!error &&<div className='weatherdetails'>
        <div className='celsius'>
            {Temp}°C
        </div>
        <div className='cityname'>
            {City}
        </div>
        <div className='Country'>
           {Country}
        </div>
        <div className='coords'>
            <div className='latitude'>
                <span style={{display:"block",fontWeight:"bold"}}>latitude</span>
                {lattitude}
            </div>
            <div className='longtitude'>
                <span style={{display:"block",fontWeight:"bold"}}>longtitude</span>
                {longtitude}</div>
        </div>
      </div>}
      {error && <p style={{textAlign:"center"}}>City is not found</p>}
     {!error && <div className='otherdetails'>
        <div className='Humidity'>
            <img src={HumidityIcon} alt='HumidityIcon' className='HumidityIcon'/>
            <span style={
                {display:"block"}
            }>{Humidity}%</span>
            Humidity
        </div>
        <div className='windspeed'>
        <img src={windSpeedIcon} alt='windspeedIcon' className='windspeedIcon'/>
            <span style={
                {display:"block"}
            }>{windSpeed}Km/hr</span>
            wind Speed
        </div>
      </div>}

    </div>
  )
}

export default Weather
