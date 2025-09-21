import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display: visible? '' : 'none' }

  const toggleDisplay = () => {
    setVisible(!visible)
  }
  useImperativeHandle(props.ref, () => {
    return { toggleDisplay }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleDisplay}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleDisplay}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable