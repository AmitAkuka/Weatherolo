import { useSelector } from "react-redux"

export const WeatherPreview = ({ forecast,isDarkMode }) => {
  const BASE_URL = 'https://developer.accuweather.com/sites/default/files'
  const { isFahrenheitUnit } = useSelector((storeState) => storeState.weatherModule)

  const convertDateToDay = (date) => {   
    return new window.Date(date).toLocaleDateString('en-US', { weekday: 'long'})
  } 

  const convertToCelsius = (fahrenheitTemp) => {
    return ((+fahrenheitTemp - 32) / 1.8).toFixed()
  }

  const { Date,Temperature,Day,Night } = forecast
  return (
    <div className="forecast-container">
      <div className="forecast-header-container"></div>
      <div className={`forecast-info-container ${(isDarkMode) ? 'dark-mode' : 'light-mode'}`}>
        <h4>{convertDateToDay(Date)}</h4>
        {isFahrenheitUnit && <h3>
          {Temperature.Minimum.Value}° - {Temperature.Maximum.Value}°
        </h3>}
        {!isFahrenheitUnit && <h3>
          {convertToCelsius(Temperature.Minimum.Value)}° - {convertToCelsius(Temperature.Maximum.Value)}°
        </h3>}
        <div className="forecast-day-night-container">
          <div className="forecast-day-container">
            <h4>Day</h4>
            <img src={`${BASE_URL}/${(Day.Icon <= 9) ? `0${Day.Icon}` : Day.Icon}-s.png`} alt="" />
            <h5>{Day.IconPhrase}</h5>
          </div>
          <div className="forecast-night-container">
            <h4>Night</h4>
            <img src={`${BASE_URL}/${(Night.Icon <= 9) ? `0${Night.Icon}` : Night.Icon}-s.png`} alt="" />
            <h5>{Night.IconPhrase}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
