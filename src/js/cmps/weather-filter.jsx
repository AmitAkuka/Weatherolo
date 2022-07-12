import SearchIcon from '@mui/icons-material/Search'

import { ComboBox } from './combo-box.jsx'

export const WeatherFilter = ({cityList,onSetFilter,onSelectCity,isDarkMode}) => {

  return (
    <section className="main-filter-container">
      <div autoComplete='off' className={`filter-container ${(isDarkMode) ? 'dark-mode' : 'light-mode'}`}>
        <SearchIcon />
        <ComboBox 
           cityList={cityList} 
           onSetFilter={onSetFilter} 
           onSelectCity={onSelectCity}
        />
      </div>
    </section>
  )
}
