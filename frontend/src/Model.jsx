/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDom from 'react-dom'

const MODEL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  overflow: 'auto'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
  overflow: 'auto'
}

export default function Model({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODEL_STYLES}>
        <button className='btn bg-danger fs-2' style={{ marginLeft: "92%", marginTop: "5px" }} onClick={onClose}> x </button>
        {children}
      </div>
    </>,
    document.getElementById('test-root')
  )
}