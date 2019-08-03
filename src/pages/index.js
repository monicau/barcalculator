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

const Index = (props) => {
  const [ mode, setMode ] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const options = [
    'Settings',
    'About',
  ];
  return (
    <div>
      <div className='container'>
        { mode === 0 ? <Calculator /> : <ReverseCalculator /> }
      </div>
      <BottomNavigation
        className='bottom-nav'
        value={mode}
        onChange={(event, newValue) => {setMode(newValue); window.scrollTo(0,0)}}
        showLabels
      >
        <BottomNavigationAction label='Barbell Calculator' icon={<IconWeights />} />
        <BottomNavigationAction label="What's on my bar??" icon={<IconReverse />} />
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
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Changelog</MenuItem>
        </Menu>
      </div>
      </BottomNavigation>
    </div>
  )
}
export default Index
