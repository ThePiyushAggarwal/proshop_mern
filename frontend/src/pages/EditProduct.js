import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct, resetProductUpdate } from '../features/admin/adminSlice'
import { getProductById } from '../features/products/productSlice'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default function EditProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { user: loggedInUser } = useSelector((state) => state.user)
  const { product } = useSelector((state) => state.product)
  const { productUpdateLoading, productUpdateSuccess, productUpdateError } =
    useSelector((state) => state.admin)

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  })

  const { name, price, image, brand, category, countInStock, description } =
    formData

  useEffect(() => {
    if (!loggedInUser?.isAdmin) {
      navigate('/login')
    }
  }, [navigate, loggedInUser])

  useEffect(() => {
    dispatch(getProductById(id))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setFormData(product)
  }, [product])

  useEffect(() => {
    if (productUpdateSuccess) {
      navigate('/admin/productList')
    }
    return () => {
      dispatch(resetProductUpdate())
    }
  }, [navigate, productUpdateSuccess, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ id, details: { ...formData } }))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Button as={Link} to='/admin/productList' className='btn-light'>
        Go Back
      </Button>
      {productUpdateLoading && <Loader />}
      {productUpdateError !== '' && (
        <Alert variant='danger'>{productUpdateError}</Alert>
      )}
      <FormContainer>
        <h1>Edit Product</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='name' className='py-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Enter Name'
              required
              value={name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='price' className='py-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              name='price'
              placeholder='Enter Price'
              value={price}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='image' className='py-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              name='image'
              placeholder='Enter Image'
              required
              value={image}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='brand' className='py-3'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              name='brand'
              placeholder='Enter Brand'
              required
              value={brand}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='countInStock' className='py-3'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              name='countInStock'
              placeholder='Enter Count In Stock'
              value={countInStock}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='category' className='py-3'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              name='category'
              placeholder='Enter Category'
              required
              value={category}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='description' className='py-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              row={5}
              name='description'
              placeholder='Enter Description'
              required
              value={description}
              onChange={onChange}
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}
