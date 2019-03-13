import React, { Component } from 'react'
import { delay } from './utils'
import './App.css'
import styles from './styles'

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

class App extends Component {
  state = {
    // system state
    // 1: Go (Green)
    // 2: Caution (Yellow)
    // 3: Stop (Red)
    // 4: Get Ready (Red, Yellow Blinking)
    value: 1,
    // lamp state
    redValue: 0,
    yellowValue: 0,
    greenValue: 1,
    // button state
    isButtonDisabled: false,
  }

  updateLight = () => {
    switch(this.state.value) {
      case 1:
        this.setState({
          redValue: 0,
          yellowValue: 0,
          greenValue: 1,
        })
        break
      case 2:
        this.setState({
          redValue: 0,
          yellowValue: 1,
          greenValue: 0,
        })
        break
      case 3:
        this.setState({
          redValue: 1,
          yellowValue: 0,
          greenValue: 0,
        })
        break
      case 4:
        this.setState({
          redValue: 1,
          yellowValue: 2,
          greenValue: 0,
        })
        break
      default:
        this.setState({
          redValue: 0,
          yellowValue: 0,
          greenValue: 1,
        })
        break
    }
  }

  handleStopButton = async () => {
    if (!this.state.isButtonDisabled) {
      await this.setStateAsync({ isButtonDisabled: true })
      await delay(config.T1)
      await this.setStateAsync({ value: 2 })
      this.updateLight()
      await delay(config.T2)
      await this.setStateAsync({ value: 3 })
      this.updateLight()
      await delay(config.T3)
      await this.setStateAsync({ value: 4 })
      this.updateLight()
      await delay(config.T4)
      await this.setStateAsync({ value: 1 })
      this.updateLight()
      await this.setStateAsync({ isButtonDisabled: false })
    }
  }

  setStateAsync (state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  render() {
    return (
      <div>
        <div id="traffic-light">
          <span style={styles.redLight[this.state.redValue]} />
          <span style={styles.yellowLight[this.state.yellowValue]} />
          <span style={styles.greenLight[this.state.greenValue]} />
        </div>
        <button
          onClick={this.handleStopButton}
          disabled={this.state.isButtonDisabled}
          className='button'
          type='button'>
          Stop
        </button>
      </div>
    )
  }
}

export default App
