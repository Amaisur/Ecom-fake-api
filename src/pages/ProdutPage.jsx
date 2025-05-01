import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './product-page.css'
import useCart from '../components/useCart';
import { Spinner, TextField, Box, Button, Text } from '@shopify/polaris';
import { MinusIcon, PlusIcon } from '@shopify/polaris-icons';

function ProductPage({setCount, openDrawer}) {
    const { count, updateCount } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingatc, setLoadingAtc] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:3001/products';
    const ATC_API = 'http://localhost:3002/myCart';
    const { productId } = useParams();
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message);
            } finally {
                setLoading(false);

            }
        };

        getProduct();
    }, [productId]);



    const addToCart = async (e) => {
        e.preventDefault();
        e.target.setAttribute('disables', 'disabled');

        const quantity = parseInt(e.target.quantity.value);
        const productId = product.id;
        
            setLoadingAtc(true)
        try {
            const checkResponse = await fetch(`${ATC_API}/${productId}`);
            if (checkResponse.ok) {
                const existingItem = await checkResponse.json();
                await fetch(`${ATC_API}/${existingItem.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...existingItem,
                        quantity: existingItem.quantity + quantity
                    })
                });
            } else {
                await fetch(ATC_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: productId,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: quantity
                    })
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
            setLoadingAtc(false);
            e.target.removeAttribute('disables', 'disabled');
            }, 200)
            setCount()
            openDrawer(e)
        }
    };


    const [quantityInput, setQuantityInput] = useState(1);

    const handleQuantity = (value) => {
        setQuantityInput(value)
    }

    const minusQuantity = () => {
        if (quantityInput > 1){
        setQuantityInput(quantityInput - 1)
        }
    }
    
    const plusQuantity = () => {
        setQuantityInput(quantityInput + 1)
    }
    return (
        <div className='product-page'>
            {loading ? <Spinner accessibilityLabel="Spinner example" size="large" /> :
                error ? <p>{`Error: ${error}`}</p> :
                    product ? (
                        <div className='product-main'>
                            <div className='product-row'>
                                <div className='image-gallery'>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className='product-info'>
                                <Text variant="heading3xl" as="h2">{product.title}</Text>
                                    <p>{product.description}</p>
                                    <p>Price: ${product.price}</p>

                                    <form className='add-to-cart' onSubmit={addToCart}>
                                        <input type='hidden' value={product.id} name='product-id' />
                                        <Box className="quanttiy-input">
                                        <Button onClick={minusQuantity} icon={MinusIcon} accessibilityLabel="Decrease Quantity" />
                                        <TextField
                                            type="number"
                                            value={quantityInput}
                                            onChange={handleQuantity}
                                            autoComplete="off"
                                            name="quantity"
                                            min='1'
                                            readOnly
                                            />
                                        <Button onClick={plusQuantity} icon={PlusIcon} accessibilityLabel="Add theme" />
                                        </Box>
                                        <button type='submit' className='add-to-cart-button'>
                                            {loadingatc ?  <Spinner accessibilityLabel="Spinner example" size="samll" /> : 'Add to Cart'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : <p>Product not found</p>
            }
            <span hidden>{count.length}</span>
        </div>
    );
}

export default ProductPage;
