import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTimes, FaCheck, FaTrash, FaEdit } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../features/users/userSlice'
import Loader from '../components/Loader'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export default function UsersList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, loadingUserList, errorUserList, userList } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    dispatch(getUsers())
  }, [dispatch, user, navigate])

  const deleteHandler = () => {}

  return (
    <>
      <h1>Users</h1>
      {loadingUserList ? (
        <Loader />
      ) : errorUserList ? (
        <Alert variant='danger'>{errorUserList}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/user/${user._id}/edit`}
                    variant='light'
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => deleteHandler(user._id)}
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
