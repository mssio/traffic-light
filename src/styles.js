const styles = {
  redLight: [
    {
      backgroundColor: '#b30000',
      opacity: 0.1,
    },
    {
      backgroundColor: '#ff0000',
      opacity: 1,
      boxShadow: '0 0 6em #ff3333',
    },
  ],
  yellowLight: [
    {
      backgroundColor: '#b3b300',
      opacity: 0.1,
    },
    {
      backgroundColor: '#ffff00',
      opacity: 1,
      boxShadow: '0 0 6em #ffff33',
    },
    {
      backgroundColor: '#ffff00',
      opacity: 1,
      boxShadow: '0 0 6em #ffff33',
      animation: 'yellow-blink 1s step-end infinite',
    },
  ],
  greenLight: [
    {
      backgroundColor: '#00b300',
      opacity: 0.1,
    },
    {
      backgroundColor: '#00ff00',
      opacity: 1,
      boxShadow: '0 0 6em #33ff33',
    },
  ],
}

export default styles
