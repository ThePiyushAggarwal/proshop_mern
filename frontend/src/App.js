import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from 'react-bootstrap/Container'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/cart' element={<Cart />}>
                <Route path=':id' element={<Cart />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
