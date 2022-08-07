import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Loader from '../components/Loader'
import { useNavigate, Link, useParams } from 'react-router-dom'
import {
  getOrderDetails,
  resetOrderId,
  resetOrderState,
} from '../features/orders/orderSlice'

export default function Order() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orderId } = useParams()
  const loggedInUser = useSelector((state) => state.user.user)
  const { order, loading, error } = useSelector((state) => state.order)
  const {
    _id,
    shippingAddress,
    paymentMethod,
    orderItems,
    totalPrice,
    itemsPrice,
    shippingPrice,
    taxPrice,
    user,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order

  useEffect(() => {
    dispatch(resetOrderId())
    return () => {
      dispatch(resetOrderState())
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!loggedInUser) {
      return navigate('/login')
    }
    if (order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [navigate, loggedInUser, dispatch, orderId, order])

  // Function to show a number to 2 decimal places
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return loading ? (
    <Loader />
  ) : error !== '' ? (
    <Alert variant='danger'>{error}</Alert>
  ) : (
    <>
      <h1>Order {_id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address},{' ' + shippingAddress.city + ' '}
                {shippingAddress.postalCode},{' ' + shippingAddress.country}
              </p>
              {isDelivered ? (
                <Alert variant='success'>Delivered on {deliveredAt}</Alert>
              ) : (
                <Alert variant='danger'>Not Delivered</Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
              {isPaid ? (
                <Alert variant='success'>Paid on {paidAt}</Alert>
              ) : (
                <Alert variant='danger'>Not Paid</Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant='flush'>
                {orderItems?.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} fluid rounded alt={item.name} />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = $
                        {(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>${addDecimals(itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shippping Price</Col>
                  <Col>${addDecimals(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${addDecimals(taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${addDecimals(totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
