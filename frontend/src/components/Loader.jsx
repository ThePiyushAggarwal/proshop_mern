import Spinner from 'react-bootstrap/Spinner'

function Loader() {
  return (
    <Spinner
      animation='border'
      role='status'
      className='mx-auto my-auto d-block'
      style={{ height: '100px', width: '100px' }}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}
export default Loader
