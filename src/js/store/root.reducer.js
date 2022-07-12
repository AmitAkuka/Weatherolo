import { combineReducers } from 'redux'
import { weatherReducer } from './weather/weather.reducer.js'

export const rootReducer = combineReducers({
 weatherModule : weatherReducer,
})
