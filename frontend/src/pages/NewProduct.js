import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, resetProductNew } from '../features/admin/adminSlice'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'

export default function EditProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user: loggedInUser } = useSelector((state) => state.user)
  const { productNewLoading, productNewSuccess, productNewError } = useSelector(
    (state) => state.admin
  )

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  })
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const { name, price, brand, category, countInStock, description } = formData

  useEffect(() => {
    if (!loggedInUser?.isAdmin) {
      navigate('/login')
    }
  }, [navigate, loggedInUser])

  useEffect(() => {
    if (productNewSuccess) {
      navigate('/admin/productList')
    }
    return () => {
      if (productNewSuccess) {
        dispatch(resetProductNew())
      }
    }
  }, [productNewSuccess, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createProduct({ ...formData, image }))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/uploads', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Button as={Link} to='/admin/productList' className='btn-light'>
        Go Back
      </Button>
      {productNewLoading && <Loader />}
      {productNewError !== '' && (
        <Alert variant='danger'>{productNewError}</Alert>
      )}
      <FormContainer>
        <h1>New Product</h1>
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
              type='file'
              required
              onChange={uploadFileHandler}
              accept='image/png, image/jpeg'
            />
            {uploading && <Loader />}
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
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}
