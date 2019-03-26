import React from 'react'
import { findKiloPlates } from '../kilo'
import { findPoundPlates } from '../pound'

export default class Calculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unit: 'kg',
      bar: '20',
      target: 0,
      plates: {
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
        pound_fortyFive: true
      },
      kiloPlatesDict: [
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
      ],
      poundPlatesDict: [
        { label: '1lb', id: 'pound_one', value: 1 },
        { label: '2.5lb', id: 'pound_twoFive', value: 2.5 },
        { label: '5lb', id: 'pound_five', value: 5 },
        { label: '10lb', id: 'pound_ten', value: 10 },
        { label: '25lb', id: 'pound_twentyFive', value: 25 },
        { label: '45lb', id: 'pound_fortyFive', value: 45 }
      ],
      targetPlates: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if (target.name === 'unit') {
      if (target.value === 'lb') {
        this.setState({ target: this.toPound(this.state.target) })
      } else {
        this.setState({ target: this.toKilo(this.state.target) })
      }
    }

    if (target.type === 'checkbox') {
      this.setState({
        plates: {
          ...this.state.plates,
          [name]: value
        }
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  renderCheckbox (item) {
    return <label key={item.id}>{item.label}
      <input
        name={item.id}
        type={'checkbox'}
        checked={this.state.plates[item.id]}
        onChange={this.handleInputChange} />
    </label>
  }
  renderRadios (item) {
    return <label key={item.id}>{item.label}
      <input
        name={item.id}
        type={'radio'}
        checked={this.state.plates[item.id]}
        onChange={this.handleInputChange} />
    </label>
  }
  toKilo (target) {
    return Math.round(target / 2.2046)
  }
  toPound (target) {
    return Math.round(target * 2.2046)
  }
  calculateKiloPlates () {
    const kiloPlateValues = (this.state.kiloPlatesDict.filter((item) => this.state.plates[item.id]).map((item) => item.value))
    const targetPlates = (findKiloPlates(kiloPlateValues, this.state.target, this.state.bar))
    return targetPlates
  }
  calculatePoundPlates () {
    const poundPlateValues = (this.state.poundPlatesDict.filter((item) => this.state.plates[item.id]).map((item) => item.value))
    const targetPlates = (findPoundPlates(poundPlateValues, this.state.target, this.state.bar))
    return targetPlates
  }

  render () {
    var targetPlates = []
    if (this.state.unit === 'kg') {
      targetPlates = this.calculateKiloPlates()
    } else {
      targetPlates = this.calculatePoundPlates()
    }
    return (
      <div>
        {targetPlates.map((x) => { return (x + ', ') }) }
        <br />
        <h2>Unit</h2>
        <label>
          <input
            type='radio'
            name='unit'
            value='kg'
            checked={this.state.unit === 'kg'}
            onChange={this.handleInputChange}
          />
          kilo
        </label>
        &nbsp;
        <label>
          <input
            type='radio'
            name='unit'
            value='lb'
            checked={this.state.unit === 'lb'}
            onChange={this.handleInputChange}
          />
          pound
        </label>
        <h2>Weight</h2>
        <label>
          <input
            aria-label='Target weight in kilos'
            name='target'
            type='number'
            value={this.state.unit === 'kg' ? this.state.target : this.toKilo(this.state.target)}
            onChange={this.handleInputChange}
            disabled={this.state.unit === 'lb'}
          />
          kg
        </label>
        &nbsp;
        <label>
          <input
            aria-label='Target weight in pounds'
            name='target'
            type='number'
            value={this.state.unit === 'lb' ? this.state.target : this.toPound(this.state.target)}
            onChange={this.handleInputChange}
            disabled={this.state.unit === 'kg'}
          />
          lb
        </label>
        <h2>Barbell</h2>
        <label>
          <input
            type='radio'
            name='bar'
            value={this.state.unit === 'kg' ? '20' : '45'}
            checked={this.state.bar === '20' || this.state.bar === '45'}
            onChange={this.handleInputChange}
          />
          {this.state.unit === 'kg' ? '20kg' : '45lb'}
        </label>
        &nbsp;
        <label>
          <input
            type='radio'
            name='bar'
            value={this.state.unit === 'kg' ? '15' : '35'}
            checked={this.state.bar === '15' || this.state.bar === '35'}
            onChange={this.handleInputChange}
          />
          {this.state.unit === 'kg' ? '15kg' : '35lb'}
        </label>
        <h2>Plates</h2>
        {
          this.state.unit === 'kg' ? this.state.kiloPlatesDict.map((item) => this.renderCheckbox(item)) : this.state.poundPlatesDict.map((item) => this.renderCheckbox(item))
        }

      </div>
    )
  }
}
