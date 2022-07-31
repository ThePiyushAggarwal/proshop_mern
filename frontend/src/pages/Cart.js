import React, { useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { addItem, removeItem } from '../features/cart/cartSlice'
import { getProductById } from '../features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FaTrash } from 'react-icons/fa'

function Cart() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const qty = searchParams.get('qty')
  const product = useSelector((state) => state.product.product)
  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect(() => {
    if (id) {
      if (product._id === id) {
        dispatch(
          addItem({
            id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: +qty,
          })
        )
      } else {
        dispatch(getProductById(id))
      }
    }
  }, [dispatch, id, qty, product])

  const checkoutHandler = () => {
    console.log('checkout')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert>
            Your cart is empty <Link to='/'>Go Back</Link>{' '}
          </Alert>
        ) : (
          <ListGroup variant='flush'>
            {cartItems?.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  {/* Quantity change form select */}
                  <Col md={3}>
                    <Form.Select
                      onChange={(e) =>
                        dispatch(
                          addItem({
                            id: item.id,
                            name: item.name,
                            image: item.image,
                            price: item.price,
                            countInStock: item.countInStock,
                            qty: +e.target.value,
                          })
                        )
                      }
                      defaultValue={item.qty}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant='light'
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => item.qty + acc, 0)})
                items
              </h2>
              ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
export default Cart
