import React, { Component } from 'react'
import emitter from 'utils/emitter'
import style from './style'

class RedLight extends Component {
  state = {
    value: 0,
  }

  componentDidMount () {
    emitter.on('Go', this.turnOffLight)
    emitter.on('ReadyToStop', this.turnOffLight)
    emitter.on('Caution', this.turnOffLight)
    emitter.on('Stop', this.turnOnLight)
    emitter.on('GetReady', this.turnOnLight)
  }

  componentWillUnmount () {
    emitter.off('Go', this.turnOffLight)
    emitter.off('ReadyToStop', this.turnOffLight)
    emitter.off('Caution', this.turnOffLight)
    emitter.off('Stop', this.turnOnLight)
    emitter.off('GetReady', this.turnOnLight)
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

export default RedLight
