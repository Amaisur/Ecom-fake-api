import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartDrawer from './CartDrawer'
import '../pages/header.css'

function Navbar({totalCount, products, setCount, openDrawer, closeDrawer, updateProducts}) {
  return (
    <nav className='html-navbar'>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/upload-products">Upload Products</Link>
      </li>
      <li>
        <Link className='cart-link' onClick={openDrawer}>Cart <span className='count-bubble'>{totalCount}</span></Link>
      </li>
    </ul>

    <div className='cart-drawer'>
      <CartDrawer products={products} totalCount={totalCount} setCount={setCount} closeDrawer={closeDrawer} updateProducts={updateProducts}/>
    </div>
  </nav>
  )
}

export default Navbar