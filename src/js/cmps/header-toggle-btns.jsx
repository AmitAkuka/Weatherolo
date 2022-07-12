import * as React from 'react'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useSelector, useDispatch } from 'react-redux'
import { setTempUnit, setTheme } from '../store/weather/weather.action.js'

import { ToggleBtn } from './toggle-btn.jsx'

export const HeaderToggleBtns = () => {
  const tempBtns = [
    {
      value: true,
      icon: '°F',
    },
    {
      value: false,
      icon: '°C',
    },
  ]
  const themeBtns = [
    {
      value: true,
      icon: <DarkModeIcon />,
    },
    {
      value: false,
      icon: <LightModeIcon />,
    },
  ]
  const { isDarkMode, isFahrenheitUnit } = useSelector((storeState) => storeState.weatherModule)
  const dispatch = useDispatch()

  const handleThemeChange = (ev, isDark) => {
    //when user click on a val that already selected material ui will set val as null.
    if (isDark === null) return
    dispatch(setTheme(isDark))
  }

  const handleTempUnitChange = (ev, isFahrenheit) => {
    if (isFahrenheit === null) return
    dispatch(setTempUnit(isFahrenheit))
  }

  return (
    <section className="header-toggle-btns-container">
      <ToggleBtn
        initialVal={isDarkMode}
        onChangeFunc={handleThemeChange}
        btnsData={themeBtns}
      />
      <ToggleBtn
        initialVal={isFahrenheitUnit}
        onChangeFunc={handleTempUnitChange}
        btnsData={tempBtns}
      />
    </section>
  )
}
