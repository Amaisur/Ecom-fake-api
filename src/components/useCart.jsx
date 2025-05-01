import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3002/myCart';

const useCart = () => {
  const [count, setCount] = useState([]);

  const updateCount = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCount(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    updateCount();
  }, []);

  return { count, updateCount };
};

export default useCart;
