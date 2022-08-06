import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../features/cart/cartSlice'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

export default function Payment() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const savedPaymentMethod = useSelector((state) => state.cart.paymentMethod)
  const user = useSelector((state) => state.user.user)
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod)

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
  }, [navigate, user, shippingAddress, cartItems])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeOrder')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='payment' className='py-3'>
            <Form.Label>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                value='PayPal'
                id='paypal'
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type='radio'
                label='Stripe'
                value='Stripe'
                id='stripe'
                disabled
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}
