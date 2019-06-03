import React, { useState } from 'react'

const ReverseCalculator = (props) => {
  const initialPlates = {
    kg: { 0.5: 0, 1: 0, 1.5: 0, 2: 0, 2.5: 0, 5: 0, 10: 0, 15: 0, 20: 0, 25: 0 },
    lb: { 2.5: 0, 5: 0, 10: 0, 25: 0, 35: 0, 45: 0 }
  }
  const kilos = [0.5, 1, 1.5, 2, 2.5, 5, 10, 15, 20, 25]
  const pounds = [2.5, 5, 10, 25, 35, 45]
  const [ bar, setBar ] = useState(20)
  const [ plates, setPlates ] = useState(initialPlates)

  const renderPlate = (weight, unit) => {
    return (
      <div key={weight + unit}>
        { weight + unit }<br />
        <button onClick={() => handlePlateChange(weight, unit, -1)}>-</button>
        { plates[unit][weight]}
        <button onClick={() => handlePlateChange(weight, unit, +1)}>+</button>
      </div>
    )
  }

  const renderSum = () => {
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

    return <div>
      { round(totalKg, 1) } kg / { round(totalLb, 1) } lb
    </div>
  }

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  const handlePlateChange = (weight, unit, delta) => {
    const value = plates[unit][weight] + delta
    setPlates({
      ...plates,
      [unit]: {
        ...plates[unit],
        [weight]: value
      }
    })
  }

  const handleInputChange = (event) => {
    const target = event.target
    const value = parseFloat(target.value)
    setBar(value)
  }

  return (
    <div>
      { renderSum() }
      <button onClick={() => setPlates(initialPlates)}>Reset</button>
      <br />
      <label>
        <input
          type='radio'
          name='bar'
          value={20}
          checked={bar === 20}
          onChange={handleInputChange}
        />
        20kg
      </label>
      <label>
        <input
          type='radio'
          name='bar'
          value={20.4117}
          checked={bar === 20.4117}
          onChange={handleInputChange}
        />
        45lb
      </label>
      <label>
        <input
          type='radio'
          name='bar'
          value={15}
          checked={bar === 15}
          onChange={handleInputChange}
        />
        15kg
      </label>
      <label>
        <input
          type='radio'
          name='bar'
          value={15.8757}
          checked={bar === 15.8757}
          onChange={handleInputChange}
        />
        35lb
      </label>
      { kilos.map((x) => renderPlate(x, 'kg')) }
      { pounds.map((x) => renderPlate(x, 'lb')) }
    </div>
  )
}
export default ReverseCalculator
