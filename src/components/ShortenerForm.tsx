// src/ShortenerForm.tsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

const buttonStyle: React.CSSProperties = {
    marginTop: '8px', // Add top margin (adjust as needed)
};
function ShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:8081/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortenedUrl(data.shortenedUrl);
      } else {
        throw new Error('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={containerStyle}>
      <TextField
        label="URL"
        variant="outlined"
        fullWidth
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        disabled={loading} // Disable input field while loading
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleShorten}
        disabled={loading} // Disable button while loading
        style={buttonStyle}
      >
        {loading ? <CircularProgress size={24} /> : 'Shorten'}
      </Button>
      {shortenedUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default ShortenerForm;
