import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, resetError } from '../features/users/userSlice'
import { getMyOrders } from '../features/orders/orderSlice'
import Loader from '../components/Loader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import { FaTimes } from 'react-icons/fa'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, user, updateSuccess } = useSelector(
    (state) => state.user
  )
  const { ordersLoading, ordersError, orders } = useSelector(
    (state) => state.order
  )
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(resetError())
    if (!user) {
      navigate('/')
    }
  }, [navigate, user, dispatch])

  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setMessage('Passwords do not match')
    }
    dispatch(updateUser({ name, email, password }))
    setPassword('')
    setConfirmPassword('')
    setMessage('')
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Update Profile</h2>
        {message !== '' && <Alert variant='danger'>{message}</Alert>}
        {error !== '' ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          updateSuccess && <Alert variant='success'>Profile Updated!</Alert>
        )}
        {loading && <Loader />}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='name' className='py-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='email' className='py-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password' className='py-3'>
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='py-3'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Alert variant='danger'>{ordersError}</Alert>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.slice(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.slice(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className='btn-sm'>Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}
