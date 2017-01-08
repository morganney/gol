'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Title from './components/title'
import GridSizeSelector from './components/grid-size-selector'
import GameOfLife from './components/game-of-life'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.handleGridSizeChange = this.handleGridSizeChange.bind(this)
  }

  handleGridSizeChange (size) {
    this.refs.gol.handleGridSizeChange(size)
  }

  render () {
    return (
      <div>
        <Title />
        <GridSizeSelector onGridSizeChange={this.handleGridSizeChange} />
        <GameOfLife ref='gol' />
      </div>
    )
  }
}

export default {
  init (selector) {
    ReactDOM.render(<App />, document.getElementById(selector))
  }
}
