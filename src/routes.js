import { WeatherApp } from './js/pages/weather-app.jsx'
import { WeatherFavorite } from './js/pages/weather-favorite.jsx'

export const routes = [
  {
    path: '/favorites',
    component: WeatherFavorite,
  },
  {
    path: '/',
    component: WeatherApp,
  }
]