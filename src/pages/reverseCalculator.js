import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import IconAdd from '@material-ui/icons/AddCircleOutline'
import IconRemove from '@material-ui/icons/RemoveCircleOutline'

const ReverseCalculator = (props) => {
  const initialPlates = {
    kg: { 0.5: 0, 1: 0, 1.5: 0, 2: 0, 2.5: 0, 5: 0, 10: 0, 15: 0, 20: 0, 25: 0 },
    lb: { 2.5: 0, 5: 0, 10: 0, 25: 0, 35: 0, 45: 0 }
  }
  const kilos = [0.5, 1, 1.5, 2, 2.5, 5, 10, 15, 20, 25]
  const pounds = [2.5, 5, 10, 25, 35, 45]
  const [ bar, setBar ] = useState(20)
  const [ plates, setPlates ] = useState(initialPlates)
  const [ sumKilos, setSumKilos ] = useState(0)
  const [ sumPounds, setSumPounds ] = useState(0)

  const renderPlate = (weight, unit) => {
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

  return (
    <div>
      <br />
      <div className='weight-input'>
        <div>
          <TextField
            aria-label='Target weight in kilos'
            label='kilograms'
            type='number'
            name='targetKilo'
            value={round(sumKilos)}
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
              value={round(sumPounds)}
              variant='outlined'
            />
          </label>
        </div>
      </div>
      <Button onClick={() => setPlates(initialPlates)}>Clear barbell</Button>
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
          name='bar'
          value={15.8757}
          onChange={handleInputChange}
          checked={bar === 15.8757}
        />}
        label={'35lb'}
        labelPlacement='bottom'
      />
      <h1>Kg plates on bar</h1>
      <div className='plates-wrapper'>
        { kilos.map((x) => renderPlate(x, 'kg')) }
      </div>
      <h1>Lb plates on bar</h1>
      <div className='plates-wrapper'>
        { pounds.map((x) => renderPlate(x, 'lb')) }
      </div>
    </div>
  )
}
export default ReverseCalculator
