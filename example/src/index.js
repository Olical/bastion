import React from 'react'
import ReactDOM from 'react-dom'

const HelloMessage = React.createClass({
  render: function () {
    return <div>Hello {this.props.name}</div>
  }
})

ReactDOM.render(<HelloMessage name='Oliver' />, document.querySelector('#react-mount'))

function slowThing () {
  return new Promise((res) => {
    setTimeout(() => res('Form async/await with <3'), 1000)
  })
}

async function asyncCheck () {
  console.log(await slowThing())
}

asyncCheck()

console.log('Should get a log in one second...')
