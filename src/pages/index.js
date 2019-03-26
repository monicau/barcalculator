import React from 'react'
import Calculator from './calculator'
import ReverseCalculator from './reverseCalculator'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 2
    }
  }
  changeMode (mode) {
    this.setState({ mode })
  }

  render () {
    return (
      <div>
        <button onClick={() => this.changeMode(1)}>Barbell Calculator</button>
        <button onClick={() => this.changeMode(2)}>What's on my barbell?</button>
        { this.state.mode === 1 ? <Calculator /> : <ReverseCalculator /> }
      </div>
    )
  }
}
