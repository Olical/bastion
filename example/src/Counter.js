import React from 'react'

class Counter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  render () {
    return <button onClick={() => this.inc()}>{this.state.count}</button>
  }

  inc () {
    this.setState({
      count: this.state.count + 1
    })
  }
}

export default Counter
