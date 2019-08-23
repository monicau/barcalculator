import React from 'react'
import Switch from '@material-ui/core/Switch'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ls from 'local-storage'

const isCompetitionMode = () => {
  const isCompetitionMode = ls.get('isCompetitionMode')
  console.log(isCompetitionMode)
}

const Settings = (props) => {
  return (
    <div className='settings'>
      <h1>Settings</h1>
      <div className='row'>
        <div className='label'>Competition Mode</div>
        <div>
          <Switch checked={props.competitionMode} onChange={() => props.setCompetitionMode(!props.competitionMode)} />
        </div>
        <div className='description'>
          Competition mode adds 2.5kg collars to the calculation.
        </div>
      </div>
      <div className='row'>
        <div className='label'>Default Bar</div>
        <div>
          <FormControlLabel
            value='bottom'
            control={<Radio
              name='bar'
              value='men'
              // onChange={() => setBar('men')}
              // checked={bar === 'men'}
            />}
            label='men'
            labelPlacement='start'
          />
          <FormControlLabel
            value='bottom'
            control={<Radio
              name='bar'
              value='men'
              // onChange={() => setBar('men')}
              // checked={bar === 'men'}
            />}
            label='women'
            labelPlacement='start'
          />
        </div>
      </div>
    </div>
  )
}
export default Settings
