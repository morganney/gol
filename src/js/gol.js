'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Title from './components/title'
import Status from './components/status'
import Legend from './components/legend'
import GridSizeSelector from './components/grid-size-selector'
import CellGrid from './components/cell-grid'
import Utils from './utils'

const GENERATION_TIMESPAN = 2000
const NOT_RUNNING = 'game not running'
const RUNNING = 'game is running'
const ENDED = 'game has ended'
const ALIVE = 1
const DEAD = 0

class App extends React.Component {
  constructor (props) {
    super(props)
    this.generations = 0
    this.state = {cells: [], status: NOT_RUNNING}
  }

  doGridSizeChange (size) {
    let cells = []
    let status = NOT_RUNNING

    if (parseInt(size, 10) !== 0) {
      cells = Utils.getRandomMatrix(size)
      status = RUNNING
    }

    this.setState({cells, status})
  }

  /**
   * Determine the next generation of cells and whether the game has ended.
   *
   * @returns {Undefined}
   */
  nextGeneration () {
    let cells = []
    let current = this.state.cells
    let status = RUNNING
    let foundLivingCell = false

    this.state.cells.forEach((row, x) => {
      cells[x] = []
      row.forEach((cell, y) => {
        let state = null
        let numNeighbors = this.getNeighborCount(x, y)

        if (cell === ALIVE) {
          // determine if cell remains alive
          state = (numNeighbors === 2 || numNeighbors === 3) ? ALIVE : DEAD
        }

        if (cell === DEAD) {
          // determine if cell remains dead
          state = numNeighbors === 3 ? ALIVE : DEAD
        }

        if (state === ALIVE) {
          foundLivingCell = true
        }

        cells[x][y] = state
      })
    })

    this.generations++

    if (!foundLivingCell || JSON.stringify(cells) === JSON.stringify(current)) {
      status = `${ENDED} after ${this.generations} generations`
      this.generations = 0
    }

    this.setState({cells, status})
  }

  /**
   * Checks the four corners and sides of cell (x,y) to see how many
   * neighbors are alive.
   *
   * @param {Number} x
   * @param {Number} y
   *
   * @returns {Number}
   */
  getNeighborCount (x, y) {
    let count = this.getCellState(x - 1, y - 1) + this.getCellState(x, y - 1)

    count += this.getCellState(x + 1, y - 1) + this.getCellState(x - 1, y)
    count += this.getCellState(x + 1, y) + this.getCellState(x - 1, y + 1)
    count += this.getCellState(x, y + 1) + this.getCellState(x + 1, y + 1)

    return count
  }

  /**
   * Determines whether a cell is alive or not.
   *
   * NOTE: Wrapping of the grid sides is not in play here. If the cell is
   * along the border it will be dead as determined by the rules.
   *
   * @param {Number} x
   * @param {Number} y
   *
   * @returns {Undefined || Number}
   */
  getCellState (x, y) {
    let width = this.state.cells.length
    let height = width

    if (x < 0 || x >= width || y < 0 || y >= height) {
      return 0
    }

    return this.state.cells[x][y]
  }

  render () {
    let isDisabled = false

    if (this.state.status === RUNNING) {
      isDisabled = true
      setTimeout(this.nextGeneration.bind(this), GENERATION_TIMESPAN)
    }

    return (
      <div>
        <Title />
        <GridSizeSelector
          isDisabled={isDisabled}
          onGridSizeChange={this.doGridSizeChange.bind(this)}
        />
        <Status status={this.state.status} />
        <Legend />
        <CellGrid cells={this.state.cells} />
      </div>
    )
  }
}

export default {
  init (selector) {
    ReactDOM.render(<App />, document.getElementById(selector))
  }
}
