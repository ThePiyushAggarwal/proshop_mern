import Header from './components/Header'
import Footer from './components/Footer'
import Container from 'react-bootstrap/Container'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Proshop</h1>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
