import React from 'react'

function Delete({product, cancelDelete, getProducts}) {

    const API_URL = 'http://localhost:3001/products';

    const deleteProduct = async (e) => {
        e.preventDefault();
        
        try{
            await fetch(`${API_URL}/${product.id}`, {
                method: 'DELETE',
            })

        }catch(error){
            console.error();
            
        }finally{
            getProducts();
        }


    }

  return (
    <form onSubmit={deleteProduct}>
        <div className='delete-product-buttons'>
            <button className='delete-products' type='submit'>Delete</button>
            <a href='#' onClick={cancelDelete}>Cancel</a>
        </div>
    </form>
  )
}

export default Delete