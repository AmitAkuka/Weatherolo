import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedWeathers } from '../store/weather/weather.action.js'

import { WeatherFavPreview } from '../cmps/weather-fav-preview.jsx'

export const WeatherFavorite = () => {
  const { savedWeathers, isDarkMode } = useSelector(
    (storeState) => storeState.weatherModule
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    loadSavedWeathers()
  }, [])

  const loadSavedWeathers = () => {
    dispatch(setSavedWeathers())
  }

  const onSelectFav = ({ locationId, cityName }) => {
    navigate('/', { state: { locationId, cityName } })
  }

  return (
    <section
      className={`main-weather-fav-container ${
        isDarkMode ? 'dark-mode' : 'light-mode'
      }`}
    >
      {!savedWeathers || !savedWeathers.length ? (
        <h2>No saved locations found</h2>
      ) : (
        <div className="fav-list-container">
          {savedWeathers.map((weather) => (
            <WeatherFavPreview
              key={weather.locationId + 'preview'}
              weather={weather}
              onSelectFav={onSelectFav}
            />
          ))}
        </div>
      )}
    </section>
  )
}
