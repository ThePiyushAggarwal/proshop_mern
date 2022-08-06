import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addShippingAddress } from '../features/cart/cartSlice'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export default function Shipping() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shippingAddress = useSelector((state) => state.cart.shippingAddress)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const user = useSelector((state) => state.user.user)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  useEffect(() => {
    if (!user) {
      return navigate('/login')
    }
    if (cartItems.length === 0) {
      return navigate('/')
    }
  }, [navigate, user, cartItems])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='address' className='py-3'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Address'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='city' className='py-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter City'
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='postalCode' className='py-3'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Postal Code'
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='country' className='py-3'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}
