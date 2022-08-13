import Spinner from 'react-bootstrap/Spinner'

function Loader({ height = '100px', width = '100px' }) {
  return (
    <Spinner
      animation='border'
      role='status'
      className='mx-auto my-auto d-block'
      style={{ height, width }}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}
export default Loader
