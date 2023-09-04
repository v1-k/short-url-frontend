import React, { useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import FileCopyIcon from '@mui/icons-material/FileCopy';

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
  const [showShortened, setShowShortened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const domain = "https://stackapex.com/";

  const handleShorten = async () => {
    setLoading(true); // Start loading
    setErrorMessage('');
    try {
      const response = await fetch(`${domain}create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setShortenedUrl(`${domain}${data.short_url}`);
        setShowShortened(true); // Show shortened URL and reset button
      } else if (response.status === 422) {
        const errorData = await response.json();
        
        setErrorMessage(errorData.detail); // Set the error message from the API response

      } else {
        throw new Error('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleReset = () => {
    setOriginalUrl('');
    setShortenedUrl('');
    setErrorMessage('');
    setShowShortened(false); // Hide shortened URL and reset button
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shortenedUrl);
        console.log('URL copied to clipboard');
      } else {
        // If clipboard API is not supported, provide an alternative method
        console.log('Clipboard API not supported. You can manually copy the URL.');
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <Typography variant="body2" color="error">
        {errorMessage}
      </Typography>

      {!showShortened ? (
        <>
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
            {loading ? <CircularProgress size={24} /> : 'Generate'}
          </Button>

        </>
      ) : (
        <>
          <div>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>

            <IconButton 
              color="primary" 
              aria-label="copy"
              onClick={copyToClipboard}
            >
              <FileCopyIcon />
            </IconButton>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReset}
            style={buttonStyle}
          >
            Restart
          </Button>
        </>
      )}
    </div>
  );
}

export default ShortenerForm;
