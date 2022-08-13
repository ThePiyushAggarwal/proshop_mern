import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../features/products/productSlice'
import { deleteProduct } from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function ProductList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { error, loading, products } = useSelector((state) => state.product)
  const { productDeleteSuccess } = useSelector((state) => state.admin)

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/')
    }
    dispatch(getProducts())
  }, [dispatch, user, navigate, productDeleteSuccess])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row className='py-3'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='d-flex justify-content-end align-items-center'>
          <Button onClick={() => navigate('/admin/product/new')}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/product/${product._id}/edit`}
                    variant='light'
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
