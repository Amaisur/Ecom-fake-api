import { Box, Button, Card, Layout, LegacyCard, MediaCard, Text } from '@shopify/polaris'
import { DeleteIcon, XIcon } from '@shopify/polaris-icons'
import React, { useEffect, useState } from 'react'
import QuantityBox from './QuantityBox'
import { Link } from 'react-router-dom';

function CartDrawer({products, totalCount, setCount, closeDrawer, updateProducts}) {
  const API_URL = 'http://localhost:3002/myCart';
  const [indPrice, setIndPrice] = useState({});

  useEffect(() => {
      const initialPrices = {};

      products.forEach(product => {
          initialPrices[product.id] = product.price;
      });

      setIndPrice(initialPrices);
  }, [products]);

  const updateIndPrice = (id, price) => {
      setIndPrice(prevPrice => ({
          ...prevPrice,
          [id]: price
      }));
  };

  const totalAmount = Array.isArray(products) && products.length > 0
  ? products.reduce((total, product) => total + parseFloat(product.price * product.quantity), 0).toFixed(2)
  : 0;

  const deleteProduct = async (id) => {
      try {
          // Make the API request to delete the product
          await fetch(`${API_URL}/${id}`, {
              method: 'DELETE'
          });
          
          // Update the products in the parent component to trigger re-render
          updateProducts(id);
      } catch (error) {
          console.error("Error deleting product:", error);
      }
  };

  return (
      <drawer className="drawer">
          <div className='overlay-drawer' onClick={closeDrawer}></div>
          <div className='cart-drawer-body'>
              <div className='cart-drawer-header'>
                  <Card roundedAbove={'0'}>
                      <Text variant="headingXl" as='h3'>Your Cart ({totalCount})</Text>
                      <XIcon onClick={closeDrawer} />
                  </Card>
              </div>
              <div className='cart-drawer-items'>
                  <Layout>
                      <Layout.Section>
                          {products.map(product => (
                              <MediaCard key={product.id}
                                         roundedAbove={'0'}
                                         title={product.title}
                                         primaryAction={{
                                             content: <DeleteIcon />,
                                             onAction: () => deleteProduct(product.id),
                                         }}
                                         size="small"
                                         description={
                                             <div className='description-popover'>
                                                 <div>
                                                     <p><strong>Quantity: </strong></p>
                                                     <QuantityBox Count={product.quantity} id={product.id} setCount={setCount} updateIndPrice={updateIndPrice} products={products}/>
                                                 </div>
                                                 <p>{((indPrice[product.id] || product.price) * product.quantity).toFixed(2)}</p>
                                             </div>
                                         }
                              >
                                  <img
                                      alt={product.title}
                                      width="120px"
                                      height="120px"
                                      style={{
                                          objectFit: 'contain',
                                          objectPosition: 'center',
                                      }}
                                      src={product.image}
                                  />
                              </MediaCard>
                          ))}
                      </Layout.Section>
                  </Layout>
              </div>
              <div className='cart-drawer-footer'>
                  <Card roundedAbove={'0'}>
                      <Box background='#fff'>
                          <div className='cart-drawer-footer-inner'>
                              <div className='prices-cart-drawer'>
                                  <Text variant='bodyLg' as='p'>
                                      <strong>Total Price: </strong>{totalAmount}
                                  </Text>
                              </div>
                              <Box style={{marginTop: '20px'}}>
                                  <Link to='/cart'>
                                      <Button fullWidth>Go to cart page</Button>
                                  </Link>
                                  <Box style={{marginTop: '10px'}}>
                                      <Text variant='bodySm'>Shipping Info</Text>
                                  </Box>
                              </Box>
                          </div>
                      </Box>
                  </Card>
              </div>
          </div>
      </drawer>
  );
}


export default CartDrawer