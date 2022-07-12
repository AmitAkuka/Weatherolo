
const initialState = {
  weather: null,
  forecastWeather: null,
  savedWeathers: null,
  isFahrenheitUnit: false,
  isDarkMode: false
}

export function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_WEATHER':
      return { ...state, weather: action.weather }
    case 'SET_FORECAST_WEATHER':
      return { ...state, forecastWeather: action.forecastWeather }
    case 'SET_SAVED_WEATHERS':
      return { ...state, savedWeathers: action.savedWeathers }
    case 'SET_TEMP_UNIT':
      return { ...state, isFahrenheitUnit: action.isFahrenheitUnit }
    case 'SET_THEME_MODE':
      return { ...state, isDarkMode: action.isDarkMode }
    default:
      return state
  }
}
