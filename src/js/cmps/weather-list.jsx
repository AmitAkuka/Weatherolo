import { WeatherPreview } from './weather-preview.jsx'

export const WeatherList = ({ forecasts, isDarkMode }) => {
  return (
    <section className="forecasts-main-container">
      {forecasts.map((forecast) => (
        <WeatherPreview
          key={forecast.EpochDate}
          forecast={forecast}
          isDarkMode={isDarkMode}
        />
      ))}
    </section>
  )
}
