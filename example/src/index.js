import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './Counter'

class HelloMessage extends React.Component {
  render () {
    return <div>Hello {this.props.name}! <Counter /></div>
  }
}

ReactDOM.render(<HelloMessage name='Oliver' />, document.querySelector('#react-mount'))

function slowThing () {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Form async/await with <3'), 1000)
  })
}

async function asyncCheck () {
  console.log(await slowThing())
}

asyncCheck()

console.log('Should get a log in one second...')
