import React, { useState, useEffect } from 'react'
import {
  Radio,
  FormControlLabel,
  IconButton,
  Button,
  Typography
} from '@material-ui/core'
import {
  AddCircleOutline as IconAdd,
  RemoveCircleOutline as IconRemove
} from '@material-ui/icons'

import PlateRenderer from './PlateRenderer'

const ReverseCalculator = (props) => {
  const initialPlates = {
    kg: { 0.5: 0, 1: 0, 1.5: 0, 2: 0, 2.5: 0, 5: 0, 10: 0, 15: 0, 20: 0, 25: 0 },
    lb: { 2.5: 0, 5: 0, 10: 0, 25: 0, 35: 0, 45: 0 }
  }
  const renderOrder = [
    { value: 25, unit: 'kg' },
    { value: 20, unit: 'kg' },
    { value: 45, unit: 'lb' },
    { value: 35, unit: 'lb' },
    { value: 15, unit: 'kg' },
    { value: 25, unit: 'lb' },
    { value: 10, unit: 'kg' },
    { value: 5, unit: 'kg' },
    { value: 10, unit: 'lb' },
    { value: 2.5, unit: 'kg' },
    { value: 5, unit: 'lb' },
    { value: 2, unit: 'kg' },
    { value: 1.5, unit: 'kg' },
    { value: 2.5, unit: 'lb' },
    { value: 1, unit: 'kg' },
    { value: 0.5, unit: 'kg' }
  ]
  const kilos = [0.5, 1, 1.5, 2, 2.5, 5, 10, 15, 20, 25]
  const pounds = [2.5, 5, 10, 25, 35, 45]
  const [ bar, setBar ] = useState(20)
  const [ plates, setPlates ] = useState(initialPlates)
  const [ sumKilos, setSumKilos ] = useState(0)
  const [ sumPounds, setSumPounds ] = useState(0)

  const renderPlateInput = (weight, unit) => {
    return (
      <div className='plate-count' key={weight + unit}>
        <div>
          { weight }<span className='unit'>{ unit }</span>
        </div>
        <div>
          <IconButton
            size='small'
            onClick={() => handlePlateChange(weight, unit, -1)}>
            <IconRemove />
          </IconButton>
          { plates[unit][weight]}
          <IconButton
            size='small'
            onClick={() => handlePlateChange(weight, unit, +1)}>
            <IconAdd />
          </IconButton>
        </div>
      </div>
    )
  }

  useEffect(() => {
    calculateSum()
  }, [plates, bar])

  const calculateSum = () => {
    var kg = 0
    var lb = 0
    Object.entries(plates.kg).forEach(entry => {
      const weight = entry[0]
      const count = entry[1]
      kg += weight * count
    })
    Object.entries(plates.lb).forEach(entry => {
      const weight = entry[0]
      const count = entry[1]
      lb += weight * count
    })
    const totalKg = bar + (kg + lb / 2.2046) * 2
    const totalLb = bar * 2.2046 + (kg * 2.2046 + lb) * 2
    setSumKilos(totalKg)
    setSumPounds(totalLb)
  }

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  const handlePlateChange = (weight, unit, delta) => {
    const value = plates[unit][weight] + delta
    if (value >= 0) {
      setPlates({
        ...plates,
        [unit]: {
          ...plates[unit],
          [weight]: value
        }
      })
    }
  }

  const handleInputChange = (event) => {
    const target = event.target
    const value = parseFloat(target.value)
    setBar(value)
  }

  const renderPlates = () => {
    return renderOrder.map((plate) => {
      let value = plate.value
      let unit = plate.unit
      const plateCount = plates[unit][value]
      const allPlates = []
      for (let i = 0; i < plateCount; i++) {
        allPlates.push(<PlateRenderer
          key={i}
          value={value}
          unit={unit}
        />)
      }
      return allPlates
    })
  }

  return (
    <div>
      <div className='sticky-top'>
        <div id='barbell-diagram'>
          <div id='handle-area'>
            <div>
              <div />
              <div id='handle' className={bar > 16 ? 'men' : 'women'} />
              <div />
            </div>
            <div>
              <div /><div /><div />
            </div>
          </div>
          <div id='loading-area'>
            {renderPlates()}
            <div className='remainder-bar' />
            <div className='remainder-space' />
          </div>
        </div>
        <div className='total-area'>
          <Typography>
            <h1>
              Total:&nbsp;
              <span>{round(sumKilos)}<span>kg</span></span> &nbsp;
              <span>{round(sumPounds)}<span>lb</span></span>
            </h1>
          </Typography>
          <Button onClick={() => setPlates(initialPlates)}>Clear barbell</Button>
        </div>
      </div>
      <div className='reverse-calculator-body'>
        <h1>Barbell</h1>
        <FormControlLabel
          value='bottom'
          control={<Radio
            color='primary'
            name='bar'
            value={20}
            onChange={handleInputChange}
            checked={bar === 20}
          />}
          label={'20kg'}
          labelPlacement='bottom'
        />
        <FormControlLabel
          value='bottom'
          control={<Radio
            color='primary'
            name='bar'
            value={20.4117}
            onChange={handleInputChange}
            checked={bar === 20.4117}
          />}
          label={'45lb'}
          labelPlacement='bottom'
        />
        <FormControlLabel
          value='bottom'
          control={<Radio
            color='primary'
            name='bar'
            value={15}
            onChange={handleInputChange}
            checked={bar === 15}
          />}
          label={'15kg'}
          labelPlacement='bottom'
        />
        <FormControlLabel
          value='bottom'
          control={<Radio
            color='primary'
            name='bar'
            value={15.8757}
            onChange={handleInputChange}
            checked={bar === 15.8757}
          />}
          label={'35lb'}
          labelPlacement='bottom'
        />
        <h1>Kilo plates on bar</h1>
        <div className='plates-wrapper'>
          { kilos.map((x) => renderPlateInput(x, 'kg')) }
        </div>
        <h1>Pound plates on bar</h1>
        <div className='plates-wrapper'>
          { pounds.map((x) => renderPlateInput(x, 'lb')) }
        </div>
      </div>
    </div>
  )
}
export default ReverseCalculator
