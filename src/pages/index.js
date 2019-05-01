import React from 'react'
import Calculator from './calculator'
import ReverseCalculator from './reverseCalculator'
import '../styles/main.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography';

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 1
    }
  }
  changeMode (mode) {
    this.setState({ mode })
  }

  render () {
    return (
      <div className='container'>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              News
            </Typography>
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
        <button onClick={() => this.changeMode(1)}>Barbell Calculator</button>
        <button onClick={() => this.changeMode(2)}>What's on my barbell?</button>
        { this.state.mode === 1 ? <Calculator /> : <ReverseCalculator /> }
      </div>
    )
  }
}
