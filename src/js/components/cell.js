'use strict'

import React from 'react'

class Cell extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <span
        className={this.props.alive ? 'alive' : 'dead'}
        style={this.props.styles}
      />
    )
  }
}

Cell.propTypes = {
  alive: React.PropTypes.bool.isRequired,
  styles: React.PropTypes.object.isRequired
}

export default Cell
