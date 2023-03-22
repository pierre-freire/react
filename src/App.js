import React, { useEffect, useState } from 'react'
import FuzzySearch from 'fuzzy-search';
import { getWeather } from './api';
import { cities, dayName } from './helper'
import './App.css';

function temperatureTreated(temp, kind) {
  if(kind === 'max') return Math.round(Math.max(...temp))
  if(kind === 'min') return Math.round(Math.min(...temp))
}

function App() {
  const [citiesTemperature, setCitiesTemperature] = useState([])
  const [filteredCities, setFilteredCities] = useState([])
  const [selectedCity, setSelectedCity] = useState()
  const [search, setSearch] = useState('')

  useEffect(() => {
    getCitiesWeather()
    //eslint-disable-next-line
  }, [])

  function objectfy(elements) {
    let acc = []
    let accData = {}

    elements.forEach((elm, i) => {
      acc.push(elm)
      
      if(Number.isInteger((i-23)/24)) {
        const index = Math.ceil((i-23)/24)
        accData[index] = acc
        acc = []
      }
    })

    return accData
  }

  async function getCitiesWeather() {
    await cities.map(async (elm) => {
      const res = await getWeather(elm)
    
      res.daysTemp = objectfy(res.hourly.temperature_2m)
      res.daysHumidity = objectfy(res.hourly.relativehumidity_2m)
      res.daysWindSpeed = objectfy(res.hourly.windspeed_10m)
      res.apparentTemperature = objectfy(res.hourly.apparent_temperature)
      res.name = elm.name
    
      setCitiesTemperature(citiesTemperature => [...citiesTemperature, res])
    })
  }

  function handleSearch(arg) {
    setSearch(arg)
    if(arg !== '') {
      const searcher = new FuzzySearch(citiesTemperature, ['name'])
      const result = searcher.search(arg)
      setFilteredCities(result)
      return
    }

    setFilteredCities([])
  }

  function selectCity(elm) {
    setSelectedCity(elm)
    setFilteredCities([])
    setSearch('')
  }

  return (
    <main className='app-body'>
      <header className='app-header'>
        <h1 className='header--title'>Previsão do Tempo</h1>
      </header>
      <CityCard city={selectedCity} clearCity={setSelectedCity} />
      <input 
        className='header--input'
        placeholder='Insira aqui o nome da cidade'
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
      />
      <ul className={`search-box ${selectedCity !== undefined ? 'city-selected' : 'no-city'}`} style={{ 'display': filteredCities.length > 0 ? 'block' : 'none' }}>
        {filteredCities.map((elm, i) => {
          return(
            <li key={i} className='search-box__item' onClick={() => { selectCity(elm) }}>{elm.name}</li>
          )
        })}
      </ul>
      <table className='capitals-table'>
        <thead>
          <tr className='capitals-table--header'>
            <th>Min</th>
            <th>Max</th>
            <th>Cidade</th>
            <th className='capitals-table--vanish-head'>Min</th>
            <th className='capitals-table--vanish-head'>Max</th>
            <th className='capitals-table--vanish-head'>Cidade</th>
          </tr>
        </thead>
        <tbody className='capitals-table--body'>
          {citiesTemperature.map((elm, i) => {
            return(
              <tr key={i} className='capitals-table--body__row' onClick={() => { setSelectedCity(elm) }}>
                <td><b>{temperatureTreated(elm.daysTemp['0'], 'min')}º</b></td>
                <td><b>{temperatureTreated(elm.daysTemp['0'], 'max')}º</b></td>
                <td><b>{elm.name}</b></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  );
}

const CityCard = ({ city, clearCity }) => {
  const todayHour = new Date().toISOString().slice(11, 13)

  if(city === undefined) {
    return
  }

  return(
    <section className='city-card'>
      <h2 className='city-card--city-name'>{city.name}</h2>
      <h3 className='city-card--today-temp'>{Math.round(city.daysTemp['0'][parseInt(todayHour, 10)])}ºC</h3>
      <button className='city-card--close-button' onClick={() => { clearCity() }}><i className="fa-solid fa-xmark" /></button>
      <ul className='city-card--details-list'>
        <li><b><i className="fa-solid fa-arrow-down"></i>{temperatureTreated(city.daysTemp['0'], 'min')}º <i className="fa-solid fa-arrow-up"></i>{temperatureTreated(city.daysTemp['0'], 'max')}º</b></li>
        <li>Sensação <b>{Math.round(city.apparentTemperature['0'][parseInt(todayHour, 10)])}º</b></li>
        <li>Vento <b>{Math.round(city.daysWindSpeed['0'][parseInt(todayHour, 10)])}km/h</b></li>
        <li>Humidade <b>{city.daysHumidity['0'][parseInt(todayHour, 10)]}%</b></li>
      </ul>
      <ol className='city-card--next-days'>
        <li><b>{dayName(1)}<br /><span className='card--next-days__temp'>{temperatureTreated(city.daysTemp['1'], 'min')}º {temperatureTreated(city.daysTemp['1'], 'max')}º</span></b></li>
        <li><b>{dayName(2)}<br /><span className='card--next-days__temp'>{temperatureTreated(city.daysTemp['2'], 'min')}º {temperatureTreated(city.daysTemp['2'], 'max')}º</span></b></li>
        <li><b>{dayName(3)}<br /><span className='card--next-days__temp'>{temperatureTreated(city.daysTemp['3'], 'min')}º {temperatureTreated(city.daysTemp['3'], 'max')}º</span></b></li>
        <li><b>{dayName(4)}<br /><span className='card--next-days__temp'>{temperatureTreated(city.daysTemp['4'], 'min')}º {temperatureTreated(city.daysTemp['4'], 'max')}º</span></b></li>
        <li className='city-card--vanish-day'><b>{dayName(5)}<br /><span className='card--next-days__temp'>{temperatureTreated(city.daysTemp['5'], 'min')}º {temperatureTreated(city.daysTemp['5'], 'max')}º</span></b></li>
      </ol>
    </section>
  )
}

export default App;
