import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUserById,
  resetAdminState,
  updateUser,
} from '../features/admin/adminSlice'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default function EditUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    user,
    userLoading,
    userError,
    userUpdateError,
    userUpdateSuccess,
    userUpdating,
  } = useSelector((state) => state.admin)
  const { user: loggedInUser } = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!loggedInUser?.isAdmin) {
      navigate('/login')
    }
  }, [navigate, loggedInUser])

  useEffect(() => {
    if (user?._id !== id) {
      dispatch(getUserById(id))
    }
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, id, user])

  useEffect(() => {
    return () => {
      dispatch(resetAdminState())
    }
    // eslint-disable-next-line
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ id, details: { name, email, isAdmin } }))
  }

  return (
    <>
      <Button as={Link} to='/admin/userList' className='btn-light'>
        Go Back
      </Button>
      {userUpdateSuccess && (
        <Alert variant='success'>Successfully updated</Alert>
      )}
      {userUpdateError !== '' && (
        <Alert variant='danger'>{userUpdateError}</Alert>
      )}
      {userUpdating || userLoading ? (
        <Loader />
      ) : userError !== '' ? (
        <Alert variant='danger'>{userError}</Alert>
      ) : (
        user && (
          <FormContainer>
            <h1>Edit User</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId='name' className='py-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='email' className='py-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='isAdmin' className='py-3'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin?'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </Form.Group>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          </FormContainer>
        )
      )}
    </>
  )
}
