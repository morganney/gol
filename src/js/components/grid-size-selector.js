'use strict'

import React from 'react'

function getDefaultProps () {
  let props = {options: []}

  for (let i = 5; i <= 80; i++) {
    props.options.push(i)
  }

  props.options.unshift('select a grid size to begin')

  return props
}

class GridSizeSelector extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {
    this.props.onGridSizeChange(this.refs.gridSize.value)
  }

  render () {
    let makeOption = function (option, idx) {
      if (idx === 0) {
        return <option key={idx} value={idx}>{option}</option>
      }

      return <option key={idx} value={option}>{`${option} X ${option}`}</option>
    }

    return (
      <form>
        <p>
          <select
            ref='gridSize'
            className='form-control'
            onChange={this.handleChange}>
            {this.props.options.map(makeOption)}
          </select>
        </p>
      </form>
    )
  }
}

GridSizeSelector.propTypes = {
  options: React.PropTypes.array,
  onGridSizeChange: React.PropTypes.func.isRequired
}
GridSizeSelector.defaultProps = getDefaultProps()

export default GridSizeSelector
