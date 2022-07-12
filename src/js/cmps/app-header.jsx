import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'

import { HeaderToggleBtns } from './header-toggle-btns.jsx'

export const AppHeader = () => {
  const { isDarkMode } = useSelector((storeState) => storeState.weatherModule)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState)
  }
  
  return (
    <header className={`main-header-container main-layout ${(isDarkMode) ? 'dark-mode' : 'light-mode'}`}>
      <Link to="/">
        <h1>Weatherolo</h1>
      </Link>
      <HeaderToggleBtns />
      <div className="header-btns-container">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>
      <div onClick={onMenuClick} className="hamburger-menu-container">
        <MenuIcon className="hamburger-menu" />
      </div>
      {isMenuOpen && <div className={`main-menu-container ${(isDarkMode) ? 'dark-mode' : 'light-mode'}`}>
          <NavLink onClick={() => setIsMenuOpen(false)} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => setIsMenuOpen(false)} to="/favorites">
            Favorites
          </NavLink>
          <HeaderToggleBtns />
        </div>}
    </header>
  )
}
