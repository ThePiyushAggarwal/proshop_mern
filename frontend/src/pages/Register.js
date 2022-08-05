import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, resetError } from '../features/users/userSlice'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, user } = useSelector((state) => state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(resetError())
    if (user) {
      navigate('/')
    }
  }, [navigate, user, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setMessage('Passwords do not match')
    }
    dispatch(registerUser({ name, email, password }))
    setPassword('')
    setConfirmPassword('')
    setMessage('')
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message !== '' && <Alert variant='danger'>{message}</Alert>}
      {error !== '' && <Alert variant='danger'>{error}</Alert>}
      {loading && <Loader />}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='name' className='py-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='py-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already a Costumer? <Link to='/login'>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default Register
