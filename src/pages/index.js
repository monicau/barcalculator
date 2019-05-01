import React from 'react'
import Calculator from './calculator'
import ReverseCalculator from './reverseCalculator'
import '../styles/main.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconWeights from '@material-ui/icons/FitnessCenter'
import IconReverse from '@material-ui/icons/Dialpad'
import IconSettings from '@material-ui/icons/Settings'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 1,
      drawer: false
    }
  }
  changeMode (mode) {
    this.setState({ mode })
  }

  toggleDrawer (open) {
    this.setState({ drawer: open })
  }

  render () {
    return (
      <div className='container'>
        <AppBar position='static'>
          <Toolbar>
            <IconButton onClick={() => this.toggleDrawer(true)} edge='start' color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit'>
              { this.state.mode === 1 ? 'Barbell Calculator' : 'Reverse Calculator - because I can\'t add' }
            </Typography>
          </Toolbar>
        </AppBar>
        { this.state.mode === 1 ? <Calculator /> : <ReverseCalculator /> }
        <Drawer open={this.state.drawer} onClose={() => this.toggleDrawer(false)}>
          <div onClick={() => this.toggleDrawer(false)}>
            <List className='list'>
              <ListItem selected={this.state.mode === 1} button onClick={() => this.changeMode(1)}>
                <ListItemIcon><IconWeights /></ListItemIcon>
                <ListItemText primary={'Barbell Calculator'} />
              </ListItem>
              <ListItem selected={this.state.mode === 2} button onClick={() => this.changeMode(2)}>
                <ListItemIcon><IconReverse /></ListItemIcon>
                <ListItemText primary={'Reverse Calculator'} />
              </ListItem>
            </List>
            <Divider />
            <List className='list'>
              <ListItem button>
                <ListItemIcon><IconSettings /></ListItemIcon>
                <ListItemText primary={'Settings'} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}
