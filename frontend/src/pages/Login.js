import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../features/users/userSlice'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, user } = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [navigate, user])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error !== '' && <Alert variant='danger'>{error}</Alert>}
      {loading && <Loader />}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='email' className='py-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='py-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Costumer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default Login
