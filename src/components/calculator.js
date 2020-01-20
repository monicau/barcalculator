import React, { useState, useEffect } from 'react'
import {
  TextField,
  FormControlLabel,
  Radio,
  Checkbox,
  Switch
} from '@material-ui/core'
import {
  pink,
  indigo
} from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

import findPlates from '../utils/findPlates'
import PlateRenderer from './common/PlateRenderer'
import BarbellHandleArea from './common/BarbellHandleArea'


const BARBELL = {
  'men': { 'kg': 20, 'lb': 45 },
  'women': { 'kg': 15, 'lb': 35 }
}

export default () => {
  // Set states
  const [ unit, setUnit ] = useState('kg')
  const [ activeBar, setActiveBar ] = useState('men')
  const [ targetKilo, setTargetKilo ] = useState(0)
  const [ targetLb, setTargetLb ] = useState(0)
  const [ targetPlates, setTargetPlates ] = useState([])
  const [ availablePlates, setAvailablePlates ] = useState({
    '0.5kg': true, '1kg': true, '1.5kg': true, '2kg': true,
    '2.5kg': true, '5kg': true, '10kg': true, '15kg': true,
    '20kg': true, '25kg': true, '1lb': true, '2.5lb': true,
    '5lb': true, '10lb': true, '25lb': true, '35lb': true,
    '45lb': true
  })

  useEffect(() => {
    const barWeight = BARBELL[activeBar][unit]
    const plateValues = Object.keys(availablePlates)
      .filter(plate => plate.includes(unit) && availablePlates[plate])
      .map(plate => +plate.split(/([0-9.]+)/)[1])
    const targetWeight = unit === 'kg'? targetKilo : targetLb
    const targetPlatesResult = findPlates(plateValues, targetWeight, barWeight)
    setTargetPlates(targetPlatesResult)
  }, [targetKilo, targetLb, availablePlates, unit, activeBar])

  const handleInputChange = event => setAvailablePlates({
    ...availablePlates,
    [event.target.name]: event.target.checked
  })

  const renderCheckbox = plate =>
    <FormControlLabel
      key={plate}
      value='bottom'
      label={plate}
      labelPlacement='bottom'
      control={<Checkbox
        color={unit === 'kg' ? 'primary' : 'secondary'}
        name={plate}
        checked={availablePlates[plate]}
        onChange={handleInputChange}
      />}
    />

  const toKilo = target => Math.round(target / 2.2046)
  const toPound = target => Math.round(target * 2.2046)

  const toggleUnit = () => setUnit(unit === 'kg' ? 'lb' : 'kg')

  const hasSolution = (targetPlates.length > 0 &&
    !targetPlates.includes(NaN)) || (!targetLb && !targetKilo)

  const CustomSwitch = withStyles({
    switchBase: {
      color: pink[500],
      '&$checked': {
        color: indigo[500]
      },
      '&$checked + $track': {
        backgroundColor: indigo[500]
      }
    },
    checked: {},
    track: { backgroundColor: pink[500] }
  })(Switch)

  return (
    <div>
      <div className='unit-toggle'>
       pound
        <CustomSwitch
          checked={unit === 'kg'}
          onChange={toggleUnit}
          value={unit}
        />
        kilo
      </div>
      <div id='barbell-diagram'>
        <BarbellHandleArea bar={activeBar} />
        <div id='loading-area'>
          { hasSolution ? targetPlates.map((x, i) =>
            <PlateRenderer key={i} value={x} unit={unit} />)
            : ''
          }
          <div className='remainder-bar'>
            {hasSolution ? '' : 'impossible!!'}
          </div>
          <div className='remainder-space' />
        </div>
      </div>
      <br />
      <div className='weight-input'>
        <div>
          <TextField
            aria-label='Target weight in kilos'
            label='kilograms'
            name='targetKilo'
            type='number'
            variant='outlined'
            value={targetKilo}
            onChange={event => {
              setTargetKilo(event.target.value)
              setTargetLb(toPound(event.target.value))
            }}
          />
        </div>
        <div>
          <TextField
            aria-label='Target weight in pounds'
            label='pounds'
            name='targetLb'
            type='number'
            variant='outlined'
            value={targetLb}
            onChange={event => {
              setTargetLb(event.target.value)
              setTargetKilo(toKilo(event.target.value))
            }}
          />
        </div>
      </div>
      <h1>Barbell</h1>
      {Object.entries(BARBELL).map(([bar, values]) =>
        <FormControlLabel
          key={bar}
          value='bottom'
          label={`${values[unit]}${unit}`}
          labelPlacement='bottom'
          control={<Radio
            name='bar'
            value={bar}
            color={unit === 'kg' ? 'primary' : 'secondary'}
            onChange={() => setActiveBar(bar)}
            checked={activeBar === bar}
          />}
        />)}
      <h1>Available Plates</h1>
      <div className='available-plates'>
        {Object.keys(availablePlates)
          .filter(plate => plate.includes(unit))
          .map(renderCheckbox)
        }
      </div>
    </div>
  )
}
