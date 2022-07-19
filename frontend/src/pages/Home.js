import { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/products/productSlice'

function Home() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
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
        </Row>
      )}
    </>
  )
}
export default Home
