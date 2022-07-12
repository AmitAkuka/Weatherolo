import { weatherService } from '../../services/weatherService.js'

export function setWeather(locationId) {
  return async (dispatch) => {
    try {
      const weather = await weatherService.getCurrWeatherData(locationId)
      dispatch({
        type: 'SET_WEATHER',
        weather
      })
    } catch (err) {
      console.log(err)
    }
  }
}



export function setForecastWeather(locationId, cityName) {
  return async (dispatch) => {
    try {
      const forecastWeather = await weatherService.getForecastWeatherData(
        locationId,
        cityName
        )
        dispatch({
          type: 'SET_FORECAST_WEATHER',
          forecastWeather
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  export function updateWeather(weather, cityName) {
    return (dispatch) => {
        weatherService.updateWeatherFavorite({ ...weather, cityName })
        dispatch({
          type: 'SET_WEATHER',
          weather
        })
    }
  }
  
  export function getLocationIdByCords(cords) {
  return async (dispatch) => {
    try{
      const data = await weatherService.getLocationByCoords(cords)
      dispatch(setWeather(data.id))
      dispatch(setForecastWeather(data.id, data.name))
    } catch(err){
      console.log(err)
    }
  }
}

export function getCitiesByInput(city) {
  return async () => {
    return await weatherService.getCityAutoComplete(city)
  }
}

export function setSavedWeathers() {
  return (dispatch) => {
      const savedWeathers = weatherService.getSavedWeathers()
      dispatch({
        type: 'SET_SAVED_WEATHERS',
        savedWeathers
      })
  }
}

export function setTheme(isDarkMode) {
  return (dispatch) => {
      dispatch({
        type: 'SET_THEME_MODE',
        isDarkMode
      })
  }
}

export function setTempUnit(isFahrenheitUnit) {
  return (dispatch) => {
      dispatch({
        type: 'SET_TEMP_UNIT',
        isFahrenheitUnit
      })
  }
}

export function clearData() {
  return  (dispatch) => {
      dispatch({
        type: 'SET_WEATHER',
        weather: null
      })
      dispatch({
        type: 'SET_FORECAST_WEATHER',
        forecastWeather: null
      })
  }
}