import axios from 'axios'
let access_key = process.env.WEATHER_API;
export default async(req,res)=>{

    let CITY =req.query.city
    console.log("---Weather 2---");
    // console.log("queryCriterion: ",req.query.queryCriterion)
    const weather = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${access_key}&q=${CITY}&days=11`)
    const data = weather.data
    // console.log("data: ",data)
    return res.status(200).json({message: "sent successfully", mainData:data})
}