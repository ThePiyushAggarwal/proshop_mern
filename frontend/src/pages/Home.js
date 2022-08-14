import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/products/productSlice'

function Home() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const { products, loading, error } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const onSearch = (e) => {
    e.preventDefault()
    dispatch(getProducts(searchTerm))
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Form onSubmit={onSearch}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Search'
            className='w-50 d-inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type='submit'>Search</Button>{' '}
          <Button
            type='button'
            onClick={() => {
              setSearchTerm('')
              dispatch(getProducts())
            }}
          >
            Reset
          </Button>
        </Form.Group>
      </Form>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
          {products?.length === 0 && (
            <Alert variant='info' className='mt-3'>
              No products to show
            </Alert>
          )}
        </Row>
      )}
    </>
  )
}
export default Home
