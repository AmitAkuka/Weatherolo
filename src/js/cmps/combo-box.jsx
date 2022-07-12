import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import _ from 'lodash'

export const ComboBox = ({ cityList, onSetFilter, onSelectCity }) => {
  const debounce = _.debounce(onSetFilter, 250)

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cityList}
      getOptionLabel={(option) => option.LocalizedName}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          sx={{ label: { fontFamily: 'Oswald' } }}
          {...params}
          label="Search by city here..."
          size="small"
        />
      )}
      onInputChange={debounce}
      onChange={onSelectCity}
    />
  )
}
