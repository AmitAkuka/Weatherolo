export const WeatherFavPreview = ({weather,onSelectFav}) => {
  const {cityName,description,temp} = weather
  return <section className="main-fav-preview-container" onClick={() => onSelectFav(weather)}>
    <h3>{cityName}</h3>
    <h2>{temp}°</h2>
    <h4>{description}°</h4>
  </section>
}