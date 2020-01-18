import React from 'react'

export default ({ index, value, unit }) => {
  const xl = unit === 'kg' ? [25] : [45]
  const lg = unit === 'kg' ? [20, 15] : [35, 25]
  const md = unit === 'kg' ? [10] : [10]
  const sm = unit === 'kg' ? [5] : [5]
  const xs = unit === 'kg' ? [2.5, 2, 1.5, 1, 0.5] : [2.5, 1]
  const red = unit === 'kg' ? [25, 2.5] : [55]
  const blue = unit === 'kg' ? [20, 2] : [45]
  const yellow = unit === 'kg' ? [15, 1.5] : [35]
  const green = unit === 'kg' ? [10, 1] : [25]
  const white = unit === 'kg' ? [5, 0.5] : []
  const black = unit === 'kg' ? [] : [10, 5, 2.5, 1]

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

  return <div key={index} className={`${size} ${colour}`}>
    {value}<span>{unit}</span>
  </div>
}
