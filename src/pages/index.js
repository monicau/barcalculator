import React, { useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core'
import {
  MoreVert as MoreVertIcon,
  FitnessCenter as IconWeights,
  AccessibilityNew as IconReverse
} from '@material-ui/icons'

import Calculator from '../components/calculator'
import ReverseCalculator from '../components/reverseCalculator'

import '../styles/main.scss'

export default ( ) => {
  const [ mode, setMode ] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null);

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
