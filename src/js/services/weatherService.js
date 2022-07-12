import { storageService } from './storageService.js'

export const weatherService = {
  getCityAutoComplete,
  getCurrWeatherData,
  getForecastWeatherData,
  getSavedWeathers,
  updateWeatherFavorite,
  getLocationByCoords
}
const axios = require('axios').default

//created another key for backup
// const API_KEY = 'cQZcSZeK3DfgrXlpkntkXGIhCdPF8v7q'
const API_KEY = 'DWeGXPCDGrjPrORkwANtJfFonzj4ANxE'

async function getCityAutoComplete(city) {
  try {
    const { data } = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${city}&apikey=${API_KEY}`
    )
    return data
  } catch (err) {
    console.log(err)
  }
}

async function getCurrWeatherData(locationId) {
  try {
    if (!locationId) locationId = '215854'
    const currData = storageService.load('currWeatherData')
    const isFavorite = _findSavedWeather(locationId)
    const isCurrDay = new Date(currData.LocalObservationDateTime).getDate() === new Date(Date.now()).getDate()
    if (isCurrDay && (currData?.locationId === locationId)) return {...currData, isFavorite}
    console.log('New day, getting new weather data')
    const res = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${locationId}?apikey=${API_KEY}`
    )
    const data = { ...res.data[0], locationId, isFavorite }
    storageService.save('currWeatherData', data)
    return data
  } catch (err) {
    console.log(err)
  }
}

//215854 is the default location which is tel-aviv.
async function getForecastWeatherData(locationId, cityName) {
  try {
    if (!locationId) locationId = '215854'
    if (!cityName) cityName = 'Tel Aviv'
    const currData = storageService.load('forecastWeatherData')
    const isCurrDay = new Date(currData.sampledTimestamp).getDate() === new Date(Date.now()).getDate()
    if (isCurrDay && (currData?.locationId === locationId)) return currData
    console.log('New day, getting new forecast weather data')
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationId}?apikey=${API_KEY}`
    )
    const data = {
      ...res.data,
      cityName,
      locationId,
      sampledTimestamp: Date.now(),
    }
    storageService.save('forecastWeatherData', data)
    return data
  } catch (err) {
    console.log(err)
  }
}

async function getLocationByCoords({ latitude,longitude }){
  try {
    const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`)
    const { Key, EnglishName } = res.data
    return { id: Key, name: EnglishName }
  } catch (err) {
    console.log(err)
  }
}

function getSavedWeathers(){
  return storageService.load('savedWeatherData')
}

function updateWeatherFavorite(weather) {
  let savedWeathers = storageService.load('savedWeatherData') || []
  if (weather.isFavorite) {
    const dataToSave = _getStructuredData(weather)
    savedWeathers.push(dataToSave)
  } else {
    savedWeathers = savedWeathers.filter((w) => w.locationId !== weather.locationId)
  }
  storageService.save('savedWeatherData', savedWeathers)
}

function _findSavedWeather(locationId) {
  const savedWeathers = storageService.load('savedWeatherData')
  if (!savedWeathers || !savedWeathers.length) return false
  const savedWeather = savedWeathers.find(
    (weather) => weather.locationId === locationId
  )
  return savedWeather ? true : false
}

function _getStructuredData (weather) {
  const {cityName,Temperature,IsDayTime,locationId,isFavorite,WeatherText} = weather
  const data = {
    cityName,
    temp: Temperature.Metric.Value,
    isDayTime: IsDayTime,
    locationId,
    isFavorite,
    description: WeatherText,
  }
  return data
}
