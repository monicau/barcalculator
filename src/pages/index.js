import React, { useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core'
import {
  FitnessCenter as IconWeights,
  AccessibilityNew as IconReverse
} from '@material-ui/icons'

import Calculator from '../components/calculator'
import ReverseCalculator from '../components/reverseCalculator'

import '../styles/main.scss'

export default ( ) => {
  const [ mode, setMode ] = useState(0)

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
      </BottomNavigation>
    </div>
  )
}
