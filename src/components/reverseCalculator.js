import React, { useState, useEffect } from 'react'
import {
  Radio,
  FormControlLabel,
  IconButton,
  Button,
} from '@material-ui/core'
import {
  AddCircleOutline as IconAdd,
  RemoveCircleOutline as IconRemove
} from '@material-ui/icons'

import PlateRenderer from './common/PlateRenderer'
import BarbellHandleArea from './common/BarbellHandleArea'

const renderOrder = [
  '25kg', '20kg', '45lb', '35lb', '15kg', '25lb', '10kg', '5kg',
  '10lb', '2.5kg', '5lb', '2kg', '1.5kg', '2.5lb', '1kg', '0.5kg'
]

const initialPlates = {
  '0.5kg': 0, '1kg': 0, '1.5kg': 0, '2kg': 0, '2.5kg': 0, '5kg': 0,
  '10kg': 0, '15kg': 0, '20kg': 0, '25kg': 0, '2.5lb': 0, '5lb': 0,
  '10lb': 0, '25lb': 0, '35lb': 0, '45lb': 0
}

export default () => {
  const [plates, setPlates] = useState({ ...initialPlates })
  const [ bar, setBar ] = useState(20)
  const [ sumKilos, setSumKilos ] = useState(0)
  const [ sumPounds, setSumPounds ] = useState(0)

  const reducer = (total, [plate, count]) => {
    const weight = +plate.split(/([0-9.]+)/)[1]
    return total + (weight * count)
  }

  useEffect(() => {
    const kg = Object.entries(plates)
      .filter(([plate]) => plate.includes('kg')).reduce(reducer, 0)
    const lb = Object.entries(plates)
      .filter(([plate]) => plate.includes('lb')).reduce(reducer, 0)
    const totalKg = bar + (kg + lb / 2.2046) * 2
    const totalLb = bar * 2.2046 + (kg * 2.2046 + lb) * 2
    setSumKilos(totalKg)
    setSumPounds(totalLb)
  }, [plates, bar])

  const renderPlateInput = plate => {
    const [, weight, unit] = plate.split(/([0-9.]+)/)
    return (
      <div className='plate-count' key={plate}>
        <div>
          { weight }<span className='unit'>{ unit }</span>
        </div>
        <div>
          {[-1, 1].map(delta =>
            <IconButton
              key={delta}
              size='small'
              onClick={() => handlePlateChange(plate, delta)}
            >
              {delta === -1 ? <IconRemove /> : <IconAdd />}
            </IconButton>
          )}
        </div>
      </div>
    )
  }

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  const handlePlateChange = (plate, delta) => {
    const value = plates[plate] + delta
    if (value >= 0) {
      setPlates({
        ...plates,
        [plate]: value
      })
    }
  }

  const renderPlates = plate => {
    const [, value, unit] = plate.split(/([0-9.]+)/)
    const plateCount = plates[plate]
    const allPlates = []
    for (let i = 0; i < plateCount; i++) {
      allPlates.push(<PlateRenderer key={i} value={+value} unit={unit} />)
    }
    return allPlates
  }

  return (
    <div>
      <div className='sticky-top'>
        <div id='barbell-diagram'>
          <BarbellHandleArea bar={bar > 16 ? 'men' : 'women'} />
          <div id='loading-area'>
            {renderOrder.map(renderPlates)}
            <div className='remainder-bar' />
            <div className='remainder-space' />
          </div>
        </div>
        <div className='total-area'>
          <h1>
            Total:&nbsp;
            <span>{round(sumKilos)}<span>kg</span></span> &nbsp;
            <span>{round(sumPounds)}<span>lb</span></span>
          </h1>
          <Button onClick={() => setPlates(initialPlates)}>
            Clear barbell
          </Button>
        </div>
      </div>
      <div className='reverse-calculator-body'>
        <h1>Barbell</h1>
        {Object.entries({
          '20kg': 20, '45lb': 20.4117, '15kg': 15, '35lb': 15.8757
        }).map(([label, value]) => {
          return <FormControlLabel
            key={label}
            value='bottom'
            label={label}
            labelPlacement='bottom'
            control={<Radio
              color='primary'
              name='bar'
              value={value}
              onChange={e => setBar(parseFloat(e.target.value))}
              checked={bar === value}
            />}
          />
        })}
        <h1>Kilo plates on bar</h1>
        <div className='plates-wrapper'>
          {Object.keys(plates)
            .filter(plate => plate.includes('kg'))
            .map(renderPlateInput)
          }
        </div>
        <h1>Pound plates on bar</h1>
        <div className='plates-wrapper'>
          {Object.keys(plates)
            .filter(plate => plate.includes('lb'))
            .map(renderPlateInput)
          }
        </div>
      </div>
    </div>
  )
}
