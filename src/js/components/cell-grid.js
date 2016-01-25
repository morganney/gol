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
    let width = `${(100 / this.props.cells.length)}%`
    let height = width
    let styles = {width, height}

    this.props.cells.forEach((row, x) => {
      row.forEach((cell, y) => {
        cells.push(<Cell key={idx++} alive={cell === 1} styles={styles} />)
      })
    })

    return <section>{cells}</section>
  }
}

CellGrid.propTypes = {cells: React.PropTypes.array.isRequired}

export default CellGrid
