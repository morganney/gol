'use strict'

import React from 'react'

class Legend extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <p className='legend'>
        <span>Alive <i className='alive' /></span>
        <span>Dead <i className='dead' /></span>
      </p>
    )
  }
}

export default Legend
