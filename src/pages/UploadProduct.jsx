import React, { useState } from 'react'
import { TextField, Button, Box, FormLayout, Text } from '@shopify/polaris';

function UploadProduct() {

    const API_URL = 'http://localhost:3001/products';

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('')

    const [successMessage, setSuccessMessage] = useState(false);

    const updateTitle = (value) => {
        setTitle(value)
    }
    const updatePrice = (value) => {
        setPrice(value)
    }
    const updateDescription = (value) => {
        setDescription(value)
    }
    const updateCategory = (value) => {
        setCategory(value)
    }
    const updateImage = (value) => {
        setImage(value)
    }

    const idValue = Date.now();
    const id = JSON.stringify(idValue)
    const newProduct = {
        id: id, title: title, price: price, description: description, category: category, image: image
    }

    const createProduct = async (e) => {
        e.preventDefault();
        try {

            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)

            })


        } catch (error) {
            console.error();

        }finally{
            setSuccessMessage(true);
            setTitle('');
            setPrice('');
            setCategory('');
            setDescription('');
            setImage('');
            setTimeout(() => {
                setSuccessMessage(false);  
            }, 3000)

        }
    }



    return (
        <div className='product-upload'>
            <Box padding="4" style={{ marginBottom: '30px'}}>     
            <Text variant="heading3xl" as="h2">Add product Data</Text>
            </Box>
            <form onSubmit={createProduct}>
            <FormLayout>
            <FormLayout.Group>
                <TextField
                    label="Product Title"
                    value={title}
                    onChange={updateTitle}
                    autoComplete="off"
                />
                <TextField
                    label="Product Price"
                    value={price}
                    onChange={updatePrice}
                    autoComplete="off"
                />
                <TextField
                    label="Product Category"
                    value={category}
                    onChange={updateCategory}
                    autoComplete="off"
                />
                <TextField
                    label="Product Image"
                    value={image}
                    onChange={updateImage}
                    autoComplete="off"
                />
                <TextField
                    label="Product Description"
                    value={description}
                    onChange={updateDescription}
                    multiline={4}
                    autoComplete="off"
                />

               
                </FormLayout.Group>
                </FormLayout>
                {successMessage ? 
                <Box padding="4" style={{ marginTop: '20px', background: 'red'}} className="success-message">
                    'Product Saved'
                </Box> : ''
                }
                <Box padding="4" style={{ marginTop: '20px'}}>       
                <Button submit variant="primary">Create Product</Button>
                </Box>
            </form>
        </div>

    )
}

export default UploadProduct