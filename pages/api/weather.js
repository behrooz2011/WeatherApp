import axios from 'axios'
let access_key = '4811b8ca06079ee63b5eb73a5c9798cc'// Expired...
export default async(req,res)=>{

    console.log("---Weather---");
    console.log("queryCriterion: ",req.query.queryCriterion)
    const weather = await axios.get(`http://api.weatherstack.com/forecast?access_key=${access_key}&query=${req.query.queryCriterion}&forecast_days=1`)
    const data = weather.data
    console.log("data: ",data)
    return res.status(200).json({message: "sent successfully", mainData:data})
}