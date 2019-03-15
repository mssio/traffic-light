import React, { Component } from 'react'
import { delay } from 'utils/common'
import emitter from 'utils/emitter'
import {
  RedLight,
  YellowLight,
  GreenLight
} from 'components/TrafficLight'
import { StopButton } from 'components'

const config = {
  // T1 = wait time (ms) from Go to Caution
  T1: 2000,
  // T2 = wait time (ms) from Caution to Stop
  T2: 3000,
  // T3 = wait time (ms) from Stop to Get Ready
  T3: 10000,
  // T4 = wait time (ms) from Get Ready to Go
  T4: 3000,
}

/*
System State:
 1: Go (Green)
 2: ReadyToStop (Green)
 3: Caution (Yellow)
 4: Stop (Red)
 5: GetReady (Red, Yellow Blinking)
*/
class App extends Component {
  state = {
    value: 'Go',
  }

  componentDidMount () {
    emitter.emit('Go')

    emitter.on('*', this.goToNextState)
  }

  componentWillUnmount () {
    emitter.off('*', this.goToNextState)
  }

  goToNextState = async (type) => {
    switch (type) {
      case 'Go':
        if (this.state.value === 'GetReady') {
          this.setState({ value: 'Go' })
          // do nothing, traffic light will prepare to stop when button pressed
        }
        break;
      case 'ReadyToStop':
        if (this.state.value === 'Go') {
          this.setState({ value: 'ReadyToStop' })
          // Wait for T1 to change to Caution
          await delay(config.T1)
          emitter.emit('Caution')
        }
        break;
      case 'Caution':
        if (this.state.value === 'ReadyToStop') {
          this.setState({ value: 'Caution' })
          // Wait for T2 to change to Stop
          await delay(config.T2)
          emitter.emit('Stop')
        }
        break;
      case 'Stop':
        if (this.state.value === 'Caution') {
          this.setState({ value: 'Stop' })
          // Wait for T3 to change to GetReady
          await delay(config.T3)
          emitter.emit('GetReady')
        }
        break;
      case 'GetReady':
        if (this.state.value === 'Stop') {
          this.setState({ value: 'GetReady' })
          // Wait for T4 to change to Go
          await delay(config.T4)
          emitter.emit('Go')
        }
        break;
      default:
        // No Default
        break;
    }
  }

  render() {
    return (
      <div>
        <div id="traffic-light">
          <RedLight />
          <YellowLight />
          <GreenLight />
        </div>
        <StopButton />
      </div>
    )
  }
}

export default App
