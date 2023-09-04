import { useState, useEffect } from 'react';

export default function TotalCount() {
  const [total, setTotal] = useState<number | null>(null); // Explicitly type total

  const fetchData = () => {
    fetch('https://stackapex.com/r/total')
      .then((response) => response.json())
      .then((data) => {
        setTotal(data.total);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 10000); 

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div>
      {total !== null ? (
        <p>{total.toLocaleString()}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
