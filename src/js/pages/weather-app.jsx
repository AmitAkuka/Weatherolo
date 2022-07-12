import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setWeather,
  setForecastWeather,
  updateWeather,
  getCitiesByInput,
  getLocationIdByCords,
  clearData,
} from '../store/weather/weather.action.js'
import { toast } from 'react-toastify'

import { CurrentWeather } from '../cmps/current-weather.jsx'
import { WeatherList } from '../cmps/weather-list.jsx'
import { WeatherFilter } from '../cmps/weather-filter.jsx'
import { AppLoader } from '../cmps/app-loader.jsx'

export const WeatherApp = () => {
  const { weather, forecastWeather, isDarkMode } = useSelector(
    (storeState) => storeState.weatherModule
  )
  const dispatch = useDispatch()
  const location = useLocation()
  const [cityList, setCityList] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const { locationId, cityName } = location.state || {}
    loadWeatherData(locationId, cityName)

    return () => dispatch(clearData())
  }, [])

  const loadWeatherData = async (locationId = null, cityName = null) => {
   const locationPerm = await navigator.permissions.query({ name: 'geolocation' })
    if (!locationId && locationPerm.state !== 'denied') {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch(getLocationIdByCords(pos.coords))
        },
        (error) => {
          console.log(error.message)
          loadWeatherData()
        }
      )
    } else {
      dispatch(setWeather(locationId))
      dispatch(setForecastWeather(locationId, cityName))
    }
  }

  const onSetFilter = async ({ target }) => {
    const city = target.value
    if (!city || !city.length) return
    const citiesBySearch = await dispatch(getCitiesByInput(city))
    setCityList(citiesBySearch)
  }

  const onSelectCity = ({ target }) => {
    const { optionIndex } = target.dataset
    const { Key, LocalizedName } = cityList[optionIndex]
    loadWeatherData(Key, LocalizedName)
  }

  const onFavClick = () => {
    const { cityName } = forecastWeather
    weather.isFavorite = !weather.isFavorite
    weather.isFavorite
      ? toast.success('Added to favorites successfuly!')
      : toast.error('Removed from favorites successfuly!')
    dispatch(updateWeather(weather, cityName))
  }

  if (!weather || !forecastWeather) return <AppLoader />
  const { isFavorite, IsDayTime, WeatherText, Temperature } = weather
  const { cityName, DailyForecasts } = forecastWeather
  return (
    <section
      className={`main-home-container main-layout ${
        isDarkMode ? 'dark-mode' : 'light-mode'
      }`}
    >
      <WeatherFilter
        cityList={cityList}
        onSetFilter={onSetFilter}
        onSelectCity={onSelectCity}
        isDarkMode={isDarkMode}
      />
      <div className="weather-info-container">
        <CurrentWeather
          onFavClick={onFavClick}
          isFavorite={isFavorite}
          cityName={cityName}
          temp={Temperature}
          isDayTime={IsDayTime}
          weatherTxt={WeatherText}
        />
        <WeatherList forecasts={DailyForecasts} isDarkMode={isDarkMode} />
      </div>
    </section>
  )
}
