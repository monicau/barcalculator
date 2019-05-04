import React from 'react'
import { findKiloPlates } from '../kilo'
import { findPoundPlates } from '../pound'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Checkbox from '@material-ui/core/Checkbox';

export default class Calculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unit: 'kg',
      bar: 'men',
      target_kilo: 0,
      target_lb: 0,
      targetPlates: [],
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
        pound_thirtyFive: true,
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
        { label: '35lb', id: 'pound_thirtyFive', value: 35 },
        { label: '45lb', id: 'pound_fortyFive', value: 45 }
      ]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if (target.name.includes('target') && target.name.includes('kilo')) {
      this.setState({ target_lb: this.toPound(value) })
    } else if (target.name.includes('target') && target.name.includes('lb')) {
      this.setState({ target_kilo: this.toKilo(value) })
    }
    if (target.type === 'checkbox') {
      this.setState({
        plates: {
          ...this.state.plates,
          [name]: value
        }
      }, () => this.calculatePlates())
    } else {
      this.setState({
        [name]: value
      }, () => this.calculatePlates())
    }
  }
  renderCheckbox (item) {
    return <div key={item.id}>
      <FormControlLabel
        value='bottom'
        control={<Checkbox
          color={this.state.unit === 'kg' ? 'primary' : 'secondary'}
          name={item.id}
          checked={this.state.plates[item.id]}
          onChange={this.handleInputChange}
        />}
        label={item.label}
        labelPlacement='bottom'
      />
    </div>
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
    const bar = this.state.bar === 'men' ? 20 : 15
    const kiloPlateValues = (this.state.kiloPlatesDict.filter((item) => this.state.plates[item.id]).map((item) => item.value))
    const targetPlates = (findKiloPlates(kiloPlateValues, this.state.target_kilo, bar))
    return targetPlates
  }
  calculatePoundPlates () {
    const bar = this.state.bar === 'men' ? 45 : 35
    const poundPlateValues = (this.state.poundPlatesDict.filter((item) => this.state.plates[item.id]).map((item) => item.value))
    const targetPlates = (findPoundPlates(poundPlateValues, this.state.target_lb, bar))
    return targetPlates
  }
  calculatePlates () {
    if (this.state.unit === 'lb') {
      const targetPlates = this.calculatePoundPlates()
      this.setState({ targetPlates })
    } else {
      const targetPlates = this.calculateKiloPlates()
      this.setState({ targetPlates })
    }
  }

  renderPlate (value, index) {
    const xl = this.state.unit === 'kg' ? [25] : [45]
    const lg = this.state.unit === 'kg' ? [20, 15] : [35, 25]
    const md = this.state.unit === 'kg' ? [10] : [10]
    const sm = this.state.unit === 'kg' ? [5] : [5]
    const xs = this.state.unit === 'kg' ? [2.5, 2, 1.5, 1, 0.5] : [2.5, 1]
    const red = this.state.unit === 'kg' ? [25, 2.5] : [55]
    const blue = this.state.unit === 'kg' ? [20, 2] : [45]
    const yellow = this.state.unit === 'kg' ? [15, 1.5] : [35]
    const green = this.state.unit === 'kg' ? [10, 1] : [25]
    const white = this.state.unit === 'kg' ? [5, 0.5] : []
    const black = this.state.unit === 'kg' ? [] : [10, 5, 2.5, 1]

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
      {value}<span>{this.state.unit}</span>
    </div>
  }

  render () {
    return (
      <div>
        {this.state.targetPlates.map((x) => { return (x + ', ') }) }
        <div style={{ textAlign: 'right' }}>
          <FormControlLabel
            value='bottom'
            control={<Radio
              name='unit'
              value='kg'
              color={this.state.unit === 'kg' ? 'primary' : 'secondary'}
              onChange={this.handleInputChange}
              checked={this.state.unit === 'kg'}
            />}
            label='kilo'
            labelPlacement='bottom'
          />
          <FormControlLabel
            value='bottom'
            control={<Radio
              name='unit'
              value='lb'
              color={this.state.unit === 'kg' ? 'primary' : 'secondary'}
              onChange={this.handleInputChange}
              checked={this.state.unit === 'lb'}
            />}
            label='pound'
            labelPlacement='bottom'
          />
        </div>
        <div id='barbell-diagram'>
          <div id='handle-area'>
            <div>
              <div />
              <div id='handle' className={this.state.bar} />
              <div />
            </div>
            <div>
              <div /><div /><div />
            </div>
          </div>
          <div id='loading-area'>
            {this.state.targetPlates.map((x, i) => this.renderPlate(x, i))}
            <div className='remainder-bar' />
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
              name='target_kilo'
              value={this.state.target_kilo}
              onChange={this.handleInputChange}
              // disabled={this.state.unit === 'lb'}
              variant='outlined'
            />
          </div>
          <div>
            <label>
              <TextField
                aria-label='Target weight in pounds'
                label='pounds'
                name='target_lb'
                type='number'
                value={this.state.target_lb}
                onChange={this.handleInputChange}
                // disabled={this.state.unit === 'kg'}
                variant='outlined'
              />
            </label>

          </div>
        </div>
        <h2>Barbell</h2>
        <FormControlLabel
          value='bottom'
          control={<Radio
            name='bar'
            value='men'
            color={this.state.unit === 'kg' ? 'primary' : 'secondary'}
            onChange={this.handleInputChange}
            checked={this.state.bar === 'men'}
          />}
          label={this.state.unit === 'kg' ? '20kg' : '45lb'}
          labelPlacement='bottom'
        />
        &nbsp;
        <FormControlLabel
          value='bottom'
          control={<Radio
            name='bar'
            value='women'
            color={this.state.unit === 'kg' ? 'primary' : 'secondary'}
            onChange={this.handleInputChange}
            checked={this.state.bar === 'women'}
          />}
          label={this.state.unit === 'kg' ? '15kg' : '35lb'}
          labelPlacement='bottom'
        />
        <h2>Available Plates</h2>
        <div className='available-plates'>
          {
            this.state.unit === 'kg' ? this.state.kiloPlatesDict.map((item) => this.renderCheckbox(item)) : this.state.poundPlatesDict.map((item) => this.renderCheckbox(item))
          }
        </div>
      </div>
    )
  }
}
