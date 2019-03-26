import React from 'react'

export default class ReverseCalculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 1,
      bar: 20,
      plates: {
        kg: { 0.5: 0, 1: 0, 1.5: 0, 2: 0, 2.5: 0, 5: 0, 10: 0, 15: 0, 20: 0, 25: 0 },
        lb: { 2.5: 0, 5: 0, 10: 0, 25: 0, 35: 0, 45: 0 }
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.reset = this.reset.bind(this)
  }

  renderPlate (weight, unit) {
    return (
      <div key={weight + unit}>
        { weight + unit }<br />
        <button onClick={() => this.handlePlateChange(weight, unit, -1)}>-</button>
        { this.state.plates[unit][weight]}
        <button onClick={() => this.handlePlateChange(weight, unit, +1)}>+</button>
      </div>
    )
  }

  renderSum () {
    var kg = 0
    var lb = 0
    Object.entries(this.state.plates.kg).forEach(entry => {
      const weight = entry[0]
      const count = entry[1]
      kg += weight * count
    })
    Object.entries(this.state.plates.lb).forEach(entry => {
      const weight = entry[0]
      const count = entry[1]
      lb += weight * count
    })
    const totalKg = this.state.bar + (kg + lb / 2046) * 2
    const totalLb = this.state.bar * 2.2046 + (kg * 2.2046 + lb) * 2

    return <div>
      { this.round(totalKg, 1) } kg / { this.round(totalLb, 1) } lb
    </div>
  }

  reset () {
    this.setState({
      ...this.state,
      plates: {
        kg: { 0.5: 0, 1: 0, 1.5: 0, 2: 0, 2.5: 0, 5: 0, 10: 0, 15: 0, 20: 0, 25: 0 },
        lb: { 2.5: 0, 5: 0, 10: 0, 25: 0, 35: 0, 45: 0 }
      }
    })
  }

  round (value, precision) {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }

  handlePlateChange (weight, unit, delta) {
    const value = this.state.plates[unit][weight] + delta
    this.setState({
      plates: {
        ...this.state.plates,
        [unit]: {
          ...this.state.plates[unit],
          [weight]: value
        }
      }
    })
  }

  handleInputChange (event) {
    const target = event.target
    const value = parseFloat(target.value)
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render () {
    const kilos = [0.5, 1, 1.5, 2, 2.5, 5, 10, 15, 20, 25]
    const pounds = [2.5, 5, 10, 25, 35, 45]
    return (
      <div>
        { this.renderSum() }
        <button onClick={this.reset}>Reset</button>
        <br />
        <label>
          <input
            type='radio'
            name='bar'
            value={20}
            checked={this.state.bar === 20}
            onChange={this.handleInputChange}
          />
          20kg
        </label>
        <label>
          <input
            type='radio'
            name='bar'
            value={20.4117}
            checked={this.state.bar === 20.4117}
            onChange={this.handleInputChange}
          />
          45lb
        </label>
        <label>
          <input
            type='radio'
            name='bar'
            value={15}
            checked={this.state.bar === 15}
            onChange={this.handleInputChange}
          />
          15kg
        </label>
        <label>
          <input
            type='radio'
            name='bar'
            value={15.8757}
            checked={this.state.bar === 15.8757}
            onChange={this.handleInputChange}
          />
          35lb
        </label>

        { kilos.map((x) => this.renderPlate(x, 'kg')) }
        { pounds.map((x) => this.renderPlate(x, 'lb')) }
      </div>
    )
  }
}
