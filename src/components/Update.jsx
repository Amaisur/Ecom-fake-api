import { Button } from '@shopify/polaris';
import React, { useState } from 'react'



function Update({ product }) {


    const [mytitle, setTitle] = useState(product.price);
    const API_URL = 'http://localhost:3001/products';

    const UpdateInput = (e) => {
        setTitle(e.target.value)
    }
    const Updatedproduct = { ...product, price: mytitle }
    const updateTitle = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Updatedproduct)
            })

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={updateTitle}>
                <input type='text' placeholder='new Price' value={mytitle} onChange={UpdateInput} />
                <Button variant='primary' submit>Update</Button>
            </form>
        </div>
    )
}

export default Update