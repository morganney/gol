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
            disabled={this.props.isDisabled}
            onChange={this.handleChange.bind(this)}>
            {this.props.options.map(makeOption)}
          </select>
        </p>
      </form>
    )
  }
}

GridSizeSelector.propTypes = {
  options: React.PropTypes.array,
  onGridSizeChange: React.PropTypes.func.isRequired,
  isDisabled: React.PropTypes.bool.isRequired
}
GridSizeSelector.defaultProps = getDefaultProps()

export default GridSizeSelector
