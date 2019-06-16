import React, { useState } from 'react'
import Calculator from './calculator'
import ReverseCalculator from './reverseCalculator'
import '../styles/main.scss'
import IconWeights from '@material-ui/icons/FitnessCenter'
import IconReverse from '@material-ui/icons/AccessibilityNew'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const Index = (props) => {
  const [ mode, setMode ] = useState(1)

  return (
    <div>
      <div className='container'>
        { mode === 0 ? <Calculator /> : <ReverseCalculator /> }
      </div>
      <BottomNavigation
        className='bottom-nav'
        value={mode}
        onChange={(event, newValue) => setMode(newValue)}
        showLabels
      >
        <BottomNavigationAction label='Barbell Calculator' icon={<IconWeights />} />
        <BottomNavigationAction label="What's on my bar??" icon={<IconReverse />} />
      </BottomNavigation>
    </div>
  )
}
export default Index
