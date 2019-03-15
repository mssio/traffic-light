import React, { Component } from 'react'
import emitter from 'utils/emitter'
import style from './style'

class GreenLight extends Component {
  state = {
    value: 1,
  }

  componentDidMount () {
    emitter.on('Go', this.turnOnLight)
    emitter.on('ReadyToStop', this.turnOnLight)
    emitter.on('Caution', this.turnOffLight)
    emitter.on('Stop', this.turnOffLight)
    emitter.on('GetReady', this.turnOffLight)
  }

  componentWillUnmount () {
    emitter.off('Go', this.turnOnLight)
    emitter.off('ReadyToStop', this.turnOnLight)
    emitter.off('Caution', this.turnOffLight)
    emitter.off('Stop', this.turnOffLight)
    emitter.off('GetReady', this.turnOffLight)
  }

  turnOnLight = () => {
    this.setState({ value: 1 })
  }
  turnOffLight = () => {
    this.setState({ value: 0 })
  }

  render() {
    return (
      <span style={style[this.state.value]} />
    )
  }
}

export default GreenLight
