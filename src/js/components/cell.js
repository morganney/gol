'use strict'

import React from 'react'

class Cell extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <span className={this.props.classes} />
  }
}

Cell.propTypes = {classes: React.PropTypes.string.isRequired}

export default Cell
