import React, { Component } from 'react'
import emitter from 'utils/emitter'

class GreenLight extends Component {
  state = {
    disabled: false,
  }

  componentDidMount () {
    emitter.on('Go', this.enableButton)
    emitter.on('ReadyToStop', this.disableButton)
  }

  componentWillUnmount () {
    emitter.off('Go', this.enableButton)
    emitter.off('ReadyToStop', this.disableButton)
  }

  enableButton = () => {
    this.setState({ disabled: false })
  }
  disableButton = () => {
    this.setState({ disabled: true })
  }

  handleStopButton = async () => {
    if (!this.state.disabled) {
      emitter.emit('ReadyToStop')
    }
  }

  render() {
    return (
      <button
        onClick={this.handleStopButton}
        disabled={this.state.disabled}
        className='button'
        type='button'>
        Stop
      </button>
    )
  }
}

export default GreenLight
