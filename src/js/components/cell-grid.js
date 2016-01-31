'use strict'

import React from 'react'
import Cell from './cell'

class CellGrid extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let cells = []
    let idx = 0
    let size = this.props.cells.length

    this.props.cells.forEach((row) => {
      row.forEach((cell) => {
        let classes = cell === 1 ? `alive cell-${size}` : `dead cell-${size}`

        cells.push(<Cell key={idx++} classes={classes} />)
      })
    })

    return <section>{cells}</section>
  }
}

CellGrid.propTypes = {cells: React.PropTypes.array.isRequired}

export default CellGrid
