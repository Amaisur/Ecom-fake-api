import React, { useEffect } from 'react'
import { useState } from 'react'
import Update from './Update';
import Delete from './Delete';
import { Link } from 'react-router-dom';
import { Button, Spinner, Grid } from '@shopify/polaris';
import Search from './Search';

function Get() {
  const API_URL = 'http://localhost:3001/products'

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  const getProducts = async (e) => {
    setLoading(true)
    try {
      const data = await fetch(API_URL)

      const response = await data.json()
      setProducts(response)
      setLoading(false)
      // document.querySelector('.getProducts').style.display = 'none'
    } catch (error) {
      console.error(error);

    }
  }

  const [priceModel, setPriceModel] = useState(null)

  const updatePrice = (e, productId) => {
    e.preventDefault();
    setPriceModel(productId)

  }

  const removeModel = (e) => {
    setPriceModel(null)
  }

  const [deleteProduct, setDeleteProduct] = useState(null)

  const deleteModel = (e, productId) => {
    setDeleteProduct(productId)
  }

  const cancelDelete = () => {
    setDeleteProduct(null)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div>
      {/* <Search getProducts={products} /> */}
      <ul className='product-grid'>
      <Grid>
        {loading ? <Spinner accessibilityLabel="Spinner example" size="large" /> :
          products.map(product => (
            <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 3, lg: 3, xl: 3}} key={product.id}>
              <li>
                <div className='img'>
                  <div className='delete-product-card'>

                    {deleteProduct === product.id ?
                      <Delete getProducts={getProducts} product={product} cancelDelete={cancelDelete} /> : <Button onClick={(e) => deleteModel(e, product.id)}>Delete</Button>
                    }

                  </div>
                  <Link to={`/products/${product.id}`}>
                  {product.image ?
                    <img src={product.image} width='100' height='100' />
                    : ''}</Link>

                </div>
                <Link to={`/products/${product.id}`}> {product.title}</Link>
                {priceModel === product.id ?
                  <div>
                    <Update product={product} />
                    <a href='#' onClick={removeModel}>Cancel</a>

                  </div>
                  : <Button variant='primary' tone='critical' onClick={(e) => updatePrice(e, product.id)}>Update Price</Button>

                }

                <p>{product.price}</p>
              </li>
              </Grid.Cell>
            

          ))
        }

        </Grid>
      </ul>
      {/* <button className='getProducts' onClick={getProducts}>Get Products</button> */}
    </div>
  )
}

export default Get