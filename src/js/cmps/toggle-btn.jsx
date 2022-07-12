import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export const ToggleBtn = ({ initialVal, onChangeFunc, btnsData }) => {
  return (
    <ToggleButtonGroup value={initialVal} exclusive onChange={onChangeFunc}>
      {btnsData.map((btn, idx) => (
        <ToggleButton
          key={idx + 'togglebtn'}
          value={btn.value}
          sx={{ height: '30px', width: '50px', borderRadius: '30px' }}
        >
          {btn.icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
