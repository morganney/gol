'use strict'

import React from 'react'

class Status extends React.Component {
  render () {
    return (
      <p className='status'>
        <strong>Status: </strong>
        {this.props.status}
      </p>
    )
  }
}

Status.propTypes = {status: React.PropTypes.string.isRequired}

export default Status
