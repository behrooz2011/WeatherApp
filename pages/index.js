import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'


export default function Home() {
  const [inputVal, setInputVal] = useState("")
  const [currentCity,setCurrentCity] = useState({city:"",weather:"",temp:"",pressure:"",humidity:"",wind:"", date:"", temp_f:"", wind_mile:""})
  const [weatherArrForecast, setWeatherArr] = useState([])
  let farenheit = false
  const [imperial, setImperial] = useState(false)
  // console.log("weatherArrForecast origianl: ",weatherArrForecast)
  const handleCheckboxChange = (e)=>{
    setImperial(!imperial);
    console.log("imperial: ",imperial)
  }

  const changeHandler = (e)=>{
    setInputVal(e.target.value)
    console.log("Change handler ...")
    console.log(e.target.value)
  }
  const fetchWeather =()=>{
    console.log("fetch weather ...")
    axios.get(`/api/weather?queryCriterion=${inputVal}`).then(({data})=>{
      setCurrentCity({...currentCity,
        city:data.mainData.location.name,
        weather:data.mainData.current.weather_descriptions[0],
        temp:data.mainData.current.temperature,
        pressure:data.mainData.current.pressure,
        humidity:data.mainData.current.humidity,
        wind:data.mainData.current.wind_speed,
        date: data.mainData.location.localtime})
      console.log("val: ",data.mainData)})
      .catch(err=>console.log("err: ",err.message))
  }
  const fetchWeather2 =()=>{
    console.log("fetch weather 2 ...")
    axios.get(`/api/weatherAPI?city=${inputVal}`).then(({data})=>{
      let newData = data.mainData
      setCurrentCity({...currentCity,
        city:newData.location.name,
        weather:newData.current.condition.text,

        temp: newData.current.temp_c,
        temp_f: newData.current.temp_f,

        pressure:newData.current.pressure_mb,
        humidity:newData.current.humidity,

        wind: newData.current.wind_kph,
        wind_mile:newData.current.wind_mph,

        date:newData.current.last_updated
      })
      setWeatherArr(newData.forecast.forecastday)
      // console.log("weatherArrForecast: ",weatherArrForecast)
      console.log("val: ",newData)
    })
      .catch(err=>console.log("err: ",err.message))
  }
  return (
    <>
      <div className='bg-blue-50 mx-20 mt-20'>
        <div className='flex items-center justify-center m-4'>
          {/* <label className='text-gray-700 block ' htmlFor='search-bar-id'>
            Search by the city / zip code:
          </label> */}
          <input 
            className='placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-600 border-2 border-gray-200 rounded-lg p-2 my-2"' 
            name="search-bar"
            id='search-bar-id'
            type='search'
            placeholder='Your city or zip code ...'
            value={inputVal} 
            onChange={changeHandler}/>
            <button className='m-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out'
            onClick={()=>{
              console.log("Clicked!")
              fetchWeather2()
            }}>
               Search</button>
        </div>
        
<label className="relative inline-flex items-center cursor-pointer m-4">
  <input type="checkbox" checked={imperial} onChange={handleCheckboxChange} className="sr-only peer"/>
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Imperial units</span>
</label>

        <div className='bg-amber-50 p-10'>




            <h1 className='text-xl'>Your city:<span className='font-bold m-2'>{currentCity.city}</span></h1>
            <h3 className='text-sm my-2 '>Weather:<span className='font-bold m-2'>{currentCity.weather}  </span></h3>
            <h3 className='text-sm my-2'>Temperature:  {!imperial ? <span className='font-bold m-2'>{currentCity.temp} celcius</span>:<span className='font-bold m-2'>{currentCity.temp_f} farenheit</span>}</h3>
            <h3 className='text-sm my-2'>Pressure:<span className='font-bold m-2'>{currentCity.pressure}</span></h3>
            <h3 className='text-sm my-2'>Humidity:<span className='font-bold m-2'>{currentCity.humidity}</span> </h3>
            <h3 className='text-sm my-2'>Wind:{!imperial ? <span className='font-bold m-2'>{currentCity.wind} kph</span>:<span className='font-bold m-2'>{currentCity.wind_mile} mph</span>}</h3>
            <h5 className='text-sm my-2'>Date:<span className='font-bold m-2'>{currentCity.date}</span> </h5>
        </div>
        <div className='m-6 font-bold '> Weather Forecast: </div>
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 p-2 sm:m-4">
          {weatherArrForecast.map((x,i)=>{
            if(i>0){
            return (
            <div key={i} className='bg-orange-100  rounded-md shadow-md p-6'>
              <h4> Day: <span className='font-bold m-2'>{x.date}</span></h4>
              <h4> Weather: <span className='m-2 font-bold ' >{x.day.condition.text}</span></h4>
              <h4> Min: {(imperial) ? <span className='font-bold m-2'>{x.day.mintemp_f} farenheit</span> :<span className='font-bold m-2'>{x.day.mintemp_c} celcius</span>}</h4>
              <h4> Max: {(imperial) ? <span className='font-bold m-2'>{x.day.maxtemp_f} farenheit</span> :<span className='font-bold m-2'>{x.day.maxtemp_c} celcius</span>}</h4>
            </div>)}
          })}
            {/* <div className='bg-yellow-100'>01</div>
            <div className='bg-yellow-100'>02</div>
            <div className='bg-yellow-100'>03</div>
            <div className='bg-yellow-100'>04</div>
            <div className='bg-yellow-100'>05</div>
            <div className='bg-yellow-100'>06</div>
            <div className='bg-yellow-100'>07</div>
            <div className='bg-yellow-100'>08</div> */}
          </div>
      </div>
    </>
  )
}
