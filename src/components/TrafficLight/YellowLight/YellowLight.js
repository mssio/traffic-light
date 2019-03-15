import React, { Component } from 'react'
import emitter from 'utils/emitter'
import style from './style'

class YellowLight extends Component {
  state = {
    value: 0,
  }

  componentDidMount () {
    emitter.on('Go', this.turnOffLight)
    emitter.on('ReadyToStop', this.turnOffLight)
    emitter.on('Caution', this.turnOnLight)
    emitter.on('Stop', this.turnOffLight)
    emitter.on('GetReady', this.blinkLight)
  }

  componentWillUnmount () {
    emitter.off('Go', this.turnOffLight)
    emitter.off('ReadyToStop', this.turnOffLight)
    emitter.off('Caution', this.turnOnLight)
    emitter.off('Stop', this.turnOffLight)
    emitter.off('GetReady', this.blinkLight)
  }

  turnOnLight = () => {
    this.setState({ value: 1 })
  }
  turnOffLight = () => {
    this.setState({ value: 0 })
  }
  blinkLight = () => {
    this.setState({ value: 2 })
  }

  render() {
    return (
      <span style={style[this.state.value]} />
    )
  }
}

export default YellowLight
