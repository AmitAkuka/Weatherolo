import { useSelector } from 'react-redux'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

export const CurrentWeather = ({
  onFavClick,
  isFavorite,
  cityName,
  temp,
  isDayTime,
  weatherTxt,
}) => {

  const { isFahrenheitUnit } = useSelector((storeState) => storeState.weatherModule)

  const getImgURL = (temp, isDayTime) => {
    if (isDayTime) {
      return temp.Metric.Value >= 10
        ? require(`../../assets/img/overcast-day.svg`).default
        : require(`../../assets/img/overcast-day-snow.svg`).default
    } else {
      return temp.Metric.Value >= 10
        ? require(`../../assets/img/overcast-night.svg`).default
        : require(`../../assets/img/overcast-night-snow.svg`).default
    }
  }

  return (
    <section className="curr-weather-main-container">
      <h2>Weather in {cityName}</h2>
      <div className="weather-temp-container">
        {isFahrenheitUnit && <h3>{temp.Imperial.Value}°</h3>}
        {!isFahrenheitUnit && <h3>{temp.Metric.Value}°</h3>}
        <img src={getImgURL(temp, isDayTime)} alt="" />
      </div>
      <h4>{weatherTxt}</h4>
      <div className="icon-container">
        {isFavorite ? <FavoriteIcon style={{fill: '#ff2400'}} onClick={onFavClick}/>
                    : <FavoriteBorderIcon onClick={onFavClick}/>}
      </div>
    </section>
  )
}
