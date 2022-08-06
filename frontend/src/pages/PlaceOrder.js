import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import { useNavigate, Link } from 'react-router-dom'
import { createOrder, resetOrderState } from '../features/orders/orderSlice'

export default function PlaceOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const paymentMethod = useSelector((state) => state.cart.paymentMethod)
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const user = useSelector((state) => state.user.user)
  const { error, orderId } = useSelector((state) => state.order)

  // Calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const itemsPrice = +cartItems
    .reduce((sum, item) => item.price * item.qty + sum, 0)
    .toFixed(2)
  const shippingPrice = itemsPrice >= 100 ? 0 : 10
  const taxPrice = +(0.15 * itemsPrice).toFixed(2)
  const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2)

  useEffect(() => {
    if (!user) {
      return navigate('/login')
    }
    if (cartItems.length === 0) {
      return navigate('/')
    }
    if (!shippingAddress) {
      return navigate('/shipping')
    }
    if (!paymentMethod) {
      return navigate('/payment')
    }
    if (orderId) {
      return navigate(`/order/${orderId}`)
    }
  }, [navigate, user, shippingAddress, paymentMethod, cartItems, orderId])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address},{' ' + shippingAddress.city + ' '}
                {shippingAddress.postalCode},{' ' + shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant='flush'>
                {cartItems?.map((item) => (
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
              <ListGroup.Item>
                {error && <Alert variant='danger'>{error}</Alert>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='w-100'
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
