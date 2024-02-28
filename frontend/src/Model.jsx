import ReactDom from 'react-dom'

const MODEL_STYLES = {
  position: 'fixed',
  top: '10%', 
  right: '10%', 
  backgroundColor: 'rgb(34, 34, 34)',
  transform: 'translate(0, 0)', 
  zIndex: 1000,
  height: '80%', 
  width: '80%', 
  overflow: 'auto',
  borderRadius: '10px', 
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
  overflow: 'auto'
};

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