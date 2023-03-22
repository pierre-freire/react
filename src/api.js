import axios from 'axios';

const URLStart = 'https://api.open-meteo.com/v1/forecast?'
const URLEnd = '&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,apparent_temperature'

export async function getWeather (city) {
  const res = await axios.get(`${URLStart}latitude=${city.latitude}&longitude=${city.longitude}${URLEnd}`)
  return res.data
}
