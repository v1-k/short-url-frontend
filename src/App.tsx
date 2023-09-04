import Container from '@mui/material/Container';
import ShortenerForm from './components/ShortenerForm';

import './App.css'

function App() {
  

  return (
    <>
    <Container maxWidth="sm">
      <h1>URL Shortener</h1>
      <ShortenerForm />
    </Container>
    </>
  )
}

export default App
