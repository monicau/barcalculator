import React, { useState } from 'react'
import Calculator from './calculator'
import ReverseCalculator from './reverseCalculator'
import '../styles/main.scss'
import IconWeights from '@material-ui/icons/FitnessCenter'
import IconReverse from '@material-ui/icons/AccessibilityNew'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Settings from './settings'

const Index = (props) => {
  const [ mode, setMode ] = useState(3)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [ competitionMode, setCompetitionMode ] = useState(false)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
  }
  const page = () => {
    if (mode === 0) {
      return <Calculator />
    } else if (mode === 1) {
      return <ReverseCalculator />
    } else if (mode === 3) {
      return <Settings competitionMode={competitionMode} setCompetitionMode={setCompetitionMode} />
    }
  }
  return (
    <div>
      <div className='container'>
        { page() }
      </div>
      <BottomNavigation
        className='bottom-nav'
        value={mode}
        onChange={(event, newValue) => {setMode(newValue); window.scrollTo(0,0)}}
        showLabels
      >
        <BottomNavigationAction label='Barbell Calculator' icon={<IconWeights />} />
        <BottomNavigationAction label="What's on my bar??" icon={<IconReverse />} />
      </BottomNavigation>
      <div>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem id='about' onClick={handleClose}>About</MenuItem>
          <MenuItem id='settings' onClick={handleClose}>Settings</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
export default Index
