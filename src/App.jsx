
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import Products from './pages/Products'
import UploadProduct from './pages/UploadProduct'
import Navbar from './components/Navbar'
import ProdutPage from './pages/ProdutPage';
import Cart from './pages/Cart';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { useState, useEffect } from 'react';


function App() {
  const API_URL = 'http://localhost:3002/myCart';

  const [count, setCount] = useState([]);

  const updateCount = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();


      if (Array.isArray(data)) {
        setCount(data);
      } else {
        console.error('Received data is not an array:', data);
        setCount([]);
      }
      console.log(data)
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    updateCount();
  }, []);

  const updateProducts = (id) => {
    setCount(prevProducts => prevProducts.filter(product => product.id !== id));
    updateCount();
  };

  let totalCount = count.reduce((total, c) => total + (c.quantity || 0), 0); // Add fallback for quantity if it's missing


  const openDrawer = (e) => {
    e.preventDefault();
    const drawer = document.querySelector('.drawer');
    drawer.classList.add('drawer-open')
  }

  const closeDrawer = (e) => {
    e.preventDefault();
    const drawer = document.querySelector('.drawer');
    drawer.classList.remove('drawer-open')
  }


  return (
    <AppProvider>
      <Router>
        <div className='header-group'>
          <Navbar totalCount={totalCount} products={count} setCount={updateCount} openDrawer={openDrawer} closeDrawer={closeDrawer} updateProducts={updateProducts} />
        </div>
        <div className='body-content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/upload-products" element={<UploadProduct />} />
            <Route path="/products/:productId" element={<ProdutPage setCount={updateCount} openDrawer={openDrawer} />} />
            <Route path="/cart" element={<Cart setCount={updateCount} />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
