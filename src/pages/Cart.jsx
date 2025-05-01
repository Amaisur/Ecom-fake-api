import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './cart.css'
import useCart from '../components/useCart';
import { Box, Button, Spinner } from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';

function Cart({setCount}) {
    const { count, updateCount } = useCart();
    const API_URL = 'http://localhost:3002/myCart';

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);


    
    const showCartProduct = async () => {
        setLoading(true)
        try{
            const response = await fetch(API_URL)
            const data = await response.json()

            setProducts(data)
            
        }catch(error){
            console.error();
            
        }finally{
            setLoading(false)
        }

    }
    useEffect(() => {
    showCartProduct()
    updateCount()
 }, [])

 

 const removeItem = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    // const id = e.target.parentElement.getAttribute('product-id');
    try{
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        })
        const data = await response.json()

        setProducts(data)
    } catch(error){
        console.error();
        
    }finally{
        showCartProduct()
        setCount()
    }

 }
 const totalAmount = Array.isArray(products) && products.length > 0
        ? products.reduce((total, product) => total + parseFloat(product.price * product.quantity), 0).toFixed(2)
        : 0;

  return (
    <div className='cart-page'>
        <ul>
            {loading ?  <Spinner accessibilityLabel="Spinner example" size="large" /> : 
            products.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
             <li>
                <img src={product.image} width="100" height="100" />
                <div className="line-item-info">
                <h4>{product.title}</h4>
                <p product-id={product.id}><span>{product.price}</span>
                <Box className="delete-product-cart">
                <Button variant='primary' tone='critical' onClick={(e) => removeItem(e, product.id)}><DeleteIcon /></Button>
                </Box>
                </p>
                </div>
                <p>{product.quantity}x</p>
                <p>Total Amount: <span>{product.quantity > 1 ? `${(product.price * product.quantity).toFixed(2)}` : `${product.price.toFixed(2)}`}</span></p>
             </li> 
             </Link>  
            ))
        
            }
        </ul>

        <footer>
            <h5>Total Amount: {totalAmount}</h5> 
        </footer>

    </div>
  )
}

export default Cart