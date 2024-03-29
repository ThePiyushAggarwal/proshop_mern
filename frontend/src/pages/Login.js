import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, resetError } from '../features/users/userSlice'
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
  const [searchParams] = useSearchParams()
  const { loading, error, user } = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(resetError())
    if (user) {
      if (searchParams.get('redirect') === 'shipping') {
        return navigate('/shipping')
      }
      navigate('/')
    }
  }, [navigate, user, dispatch, searchParams])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
    setPassword('')
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* Test Passwords */}
      <Row className="py-3 gap-3">
        <Col className="border border-danger">
          <strong className="fw-bold">Test Admin Password</strong>
          <div>
            <strong className="fw-bold">Email:</strong> admin@example.com
          </div>
          <div>
            <strong className="fw-bold">Password:</strong> 123456
          </div>
        </Col>
        <Col className="border border-danger">
          <strong className="fw-bold">Test Normal User Password</strong>
          <div>
            <strong className="fw-bold">Email:</strong> john@example.com
          </div>
          <div>
            <strong className="fw-bold">Password:</strong> 123456
          </div>
        </Col>
      </Row>

      {error !== '' && <Alert variant="danger">{error}</Alert>}
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
