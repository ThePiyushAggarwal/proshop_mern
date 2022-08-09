import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/users/userSlice'

function Header() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Proshop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Item>
                <Nav.Link as={Link} to='/cart' className='d-flex'>
                  <FaShoppingCart className='align-self-center me-2' />
                  Cart
                </Nav.Link>
              </Nav.Item>
              {user?.isAdmin && (
                <NavDropdown title='admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/userList'>
                    User List
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/productList'>
                    Product List
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderList'>
                    Order List
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <NavDropdown.Item as={Link} to='/profile'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={signoutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Nav.Link as={Link} to='/login' className='d-flex'>
                    <FaUser className='align-self-center me-2' />
                    Sign In
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
