import React, { useState, useEffect } from 'react'
import { findKiloPlates } from '../kilo'
import { findPoundPlates } from '../pound'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import indigo from '@material-ui/core/colors/indigo'

const Calculator = (props) => {
  const initialPlates = {
    kilo_zeroFive: true,
    kilo_one: true,
    kilo_oneFive: true,
    kilo_two: true,
    kilo_twoFive: true,
    kilo_five: true,
    kilo_ten: true,
    kilo_fifteen: true,
    kilo_twenty: true,
    kilo_twentyFive: true,
    pound_one: true,
    pound_twoFive: true,
    pound_five: true,
    pound_ten: true,
    pound_twentyFive: true,
    pound_thirtyFive: true,
    pound_fortyFive: true
  }
  const kiloPlatesDict = [
    { label: '0.5kg', id: 'kilo_zeroFive', value: 0.5 },
    { label: '1kg', id: 'kilo_one', value: 1 },
    { label: '1.5kg', id: 'kilo_oneFive', value: 1.5 },
    { label: '2kg', id: 'kilo_two', value: 2 },
    { label: '2.5kg', id: 'kilo_twoFive', value: 2.5 },
    { label: '5kg', id: 'kilo_five', value: 5 },
    { label: '10kg', id: 'kilo_ten', value: 10 },
    { label: '15kg', id: 'kilo_fifteen', value: 15 },
    { label: '20kg', id: 'kilo_twenty', value: 20 },
    { label: '25kg', id: 'kilo_twentyFive', value: 25 }
  ]
  const poundPlatesDict = [
    { label: '1lb', id: 'pound_one', value: 1 },
    { label: '2.5lb', id: 'pound_twoFive', value: 2.5 },
    { label: '5lb', id: 'pound_five', value: 5 },
    { label: '10lb', id: 'pound_ten', value: 10 },
    { label: '25lb', id: 'pound_twentyFive', value: 25 },
    { label: '35lb', id: 'pound_thirtyFive', value: 35 },
    { label: '45lb', id: 'pound_fortyFive', value: 45 }
  ]
  // Set states
  const [ unit, setUnit ] = useState('kg')
  const [ bar, setBar ] = useState('men')
  const [ targetKilo, setTargetKilo ] = useState('0')
  const [ targetLb, setTargetLb ] = useState('0')
  const [ targetPlates, setTargetPlates ] = useState([])
  const [ plates, setPlates ] = useState(initialPlates)

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if (target.name.includes('target') && target.name.includes('kilo')) {
      setTargetLb(toPound(value))
    } else if (target.name.includes('target') && target.name.includes('lb')) {
      setTargetKilo(toKilo(value))
    }
    if (target.type === 'checkbox') {
      setPlates({
        ...plates,
        [name]: value
      })
    }
  }
  const renderCheckbox = (item) => {
    return <div key={item.id}>
      <FormControlLabel
        value='bottom'
        control={<Checkbox
          color={unit === 'kg' ? 'primary' : 'secondary'}
          name={item.id}
          checked={plates[item.id]}
          onChange={handleInputChange}
        />}
        label={item.label}
        labelPlacement='bottom'
      />
    </div>
  }
  const toKilo = (target) => {
    return Math.round(target / 2.2046)
  }
  const toPound = (target) => {
    return Math.round(target * 2.2046)
  }
  const calculateKiloPlates = () => {
    const barWeight = bar === 'men' ? 20 : 15
    const kiloPlateValues = (kiloPlatesDict.filter((item) => plates[item.id]).map((item) => item.value))
    const targetPlatesResult = (findKiloPlates(kiloPlateValues, targetKilo, barWeight))
    return targetPlatesResult
  }
  const calculatePoundPlates = () => {
    const barWeight = bar === 'men' ? 45 : 35
    const poundPlateValues = (poundPlatesDict.filter((item) => plates[item.id]).map((item) => item.value))
    const targetPlatesResult = (findPoundPlates(poundPlateValues, targetLb, barWeight))
    return targetPlatesResult
  }
  useEffect(() => {
    let targetPlatesResult = []
    if (unit === 'lb') {
      targetPlatesResult = calculatePoundPlates()
    } else {
      targetPlatesResult = calculateKiloPlates()
    }
    setTargetPlates(targetPlatesResult)
  }, [targetKilo, targetLb, plates, unit, bar])

  const renderPlate = (value, index) => {
    const xl = unit === 'kg' ? [25] : [45]
    const lg = unit === 'kg' ? [20, 15] : [35, 25]
    const md = unit === 'kg' ? [10] : [10]
    const sm = unit === 'kg' ? [5] : [5]
    const xs = unit === 'kg' ? [2.5, 2, 1.5, 1, 0.5] : [2.5, 1]
    const red = unit === 'kg' ? [25, 2.5] : [55]
    const blue = unit === 'kg' ? [20, 2] : [45]
    const yellow = unit === 'kg' ? [15, 1.5] : [35]
    const green = unit === 'kg' ? [10, 1] : [25]
    const white = unit === 'kg' ? [5, 0.5] : []
    const black = unit === 'kg' ? [] : [10, 5, 2.5, 1]

    let size = 'xl'
    let colour = 'white'

    if (xl.includes(value)) {
      size = 'xl'
    } else if (lg.includes(value)) {
      size = 'lg'
    } else if (md.includes(value)) {
      size = 'md'
    } else if (sm.includes(value)) {
      size = 'sm'
    } else if (xs.includes(value)) {
      size = 'xs'
    }
    if (red.includes(value)) {
      colour = 'red'
    } else if (blue.includes(value)) {
      colour = 'blue'
    } else if (yellow.includes(value)) {
      colour = 'yellow'
    } else if (green.includes(value)) {
      colour = 'green'
    } else if (white.includes(value)) {
      colour = 'white'
    } else if (black.includes(value)) {
      colour = 'black'
    }

    return <div className={`${size} ${colour}`} key={index}>
      {value}<span>{unit}</span>
    </div>
  }

  const toggleUnit = () => {
    const newUnit = unit === 'kg' ? 'lb' : 'kg'
    setUnit(newUnit)
  }

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
  const hasSolution = () => {
    return (targetPlates.length > 0 && !isNaN(targetPlates[0]))
  }

  return (
    <div>
      <div className='unit-toggle'>
       lb
        <CustomSwitch
          checked={unit === 'kg'}
          onChange={toggleUnit}
          value={unit}
        />
        kg
      </div>
      <div id='barbell-diagram'>
        <div id='handle-area'>
          <div>
            <div />
            <div id='handle' className={bar} />
            <div />
          </div>
          <div>
            <div /><div /><div />
          </div>
        </div>
        <div id='loading-area'>
          { hasSolution() ? targetPlates.map((x, i) => renderPlate(x, i)) : '' }
          <div className='remainder-bar'>{ (hasSolution() || targetLb === '0' || targetKilo === '0') ? '' : 'impossible!!' }</div>
          <div className='remainder-space' />
        </div>
      </div>
      <br />
      <div className='weight-input'>
        <div>
          <TextField
            aria-label='Target weight in kilos'
            label='kilograms'
            type='number'
            name='targetKilo'
            value={targetKilo}
            onChange={(event) => { setTargetKilo(event.target.value); setTargetLb(toPound(event.target.value)) }}
            variant='outlined'
          />
        </div>
        <div>
          <label>
            <TextField
              aria-label='Target weight in pounds'
              label='pounds'
              name='targetLb'
              type='number'
              value={targetLb}
              onChange={(event) => { setTargetLb(event.target.value); setTargetKilo(toKilo(event.target.value)) }}
              variant='outlined'
            />
          </label>
        </div>
      </div>
      <h1>Barbell</h1>
      <FormControlLabel
        value='bottom'
        control={<Radio
          name='bar'
          value='men'
          color={unit === 'kg' ? 'primary' : 'secondary'}
          onChange={() => setBar('men')}
          checked={bar === 'men'}
        />}
        label={unit === 'kg' ? '20kg' : '45lb'}
        labelPlacement='bottom'
      />
      &nbsp;
      <FormControlLabel
        value='bottom'
        control={<Radio
          name='bar'
          value='women'
          color={unit === 'kg' ? 'primary' : 'secondary'}
          onChange={() => setBar('women')}
          checked={bar === 'women'}
        />}
        label={unit === 'kg' ? '15kg' : '35lb'}
        labelPlacement='bottom'
      />
      <h1>Available Plates</h1>
      <div className='available-plates'>
        {
          unit === 'kg' ? kiloPlatesDict.map((item) => renderCheckbox(item)) : poundPlatesDict.map((item) => renderCheckbox(item))
        }
      </div>
    </div>
  )
}
export default Calculator
