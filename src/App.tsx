import Container from '@mui/material/Container';
import ShortenerForm from './components/ShortenerForm';
import TotalCount from './components/TotalCount';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Container maxWidth="sm">
        <h1>URL Shortcut</h1>
        <ShortenerForm />
      </Container>
      <footer className="footer">
        <h3>Total generated so far</h3>
        <TotalCount />
      </footer>
    </div>
  );
}

export default App;
