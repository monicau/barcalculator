import React from 'react'
import { findKiloPlates } from '../kilo'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bar: 15,
      target: 0,
      plates: {
        zeroFive: true,
        one: true,
        oneFive: true,
        two: true,
        twoFive: true,
        five: true,
        ten: true,
        fifteen: true,
        twenty: true,
        twentyFive: true
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

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

  render () {
    var kiloPlates = [
      { label: '0.5kg', id: 'zeroFive', value: 0.5 },
      { label: '1kg', id: 'one', value: 1 },
      { label: '1.5kg', id: 'oneFive', value: 1.5 },
      { label: '2kg', id: 'two', value: 2 },
      { label: '2.5kg', id: 'twoFive', value: 2.5 },
      { label: '5kg', id: 'five', value: 5 },
      { label: '10kg', id: 'ten', value: 10 },
      { label: '15kg', id: 'fifteen', value: 15 },
      { label: '20kg', id: 'twenty', value: 20 },
      { label: '25kg', id: 'twentyFive', value: 25 }
    ]
    var plates = (kiloPlates.filter((item) => this.state.plates[item.id]).map((item) => item.value))
    var targetPlates = (findKiloPlates(plates, this.state.target, 20))
    return (
      <div>
        <h1>Hello, world!</h1>

        { kiloPlates.map((item) => this.renderCheckbox(item)) }
        <label>
          Weight
          <input
            name='target'
            type='number'
            value={this.state.target}
            onChange={this.handleInputChange}
          />
        </label>
        {targetPlates.map((x) => { return (x + ', ') }) }
      </div>
    )
  }
}
