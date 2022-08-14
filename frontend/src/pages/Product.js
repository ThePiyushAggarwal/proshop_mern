import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProductById,
  resetCreateReview,
  createReview,
} from '../features/products/productSlice'
import { useNavigate } from 'react-router-dom'

function Product() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    product,
    loading,
    error,
    createReviewLoading,
    createReviewSuccess,
    createReviewError,
  } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProductById(id))
    dispatch(resetCreateReview())
  }, [dispatch, id, createReviewSuccess])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const onReviewSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createReview({
        id: product._id,
        details: {
          rating,
          comment,
        },
      })
    )
    setRating(1)
    setComment('')
  }

  return (
    <>
      <Button as={Link} to='/' className='btn-light'>
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Select quantity button */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col xs={8}>
                          <Form.Select onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='w-100'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col md={6}>
              <h2>Reviews</h2>
              <ListGroup variant='flush'>
                {product.reviews?.length === 0 ? (
                  <Alert variant='info'>No reviews yet for this product</Alert>
                ) : (
                  product.reviews?.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.slice(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))
                )}
                <ListGroup.Item>
                  <h3>Write a Costumer Review</h3>
                  {createReviewLoading && <Loader />}
                  {createReviewError && (
                    <Alert variant='danger'>{createReviewError}</Alert>
                  )}
                  <Form onSubmit={onReviewSubmit}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Select onChange={(e) => setRating(e.target.value)}>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='comment' className='my-3'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button type='submit'>Add Review</Button>
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default Product
