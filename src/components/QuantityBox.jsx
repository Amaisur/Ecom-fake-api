import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@shopify/polaris'
import { MinusIcon, PlusIcon } from '@shopify/polaris-icons';


function QuantityBox({ Count, id, setCount, updateIndPrice, products}) {

    const API_URL = 'http://localhost:3002/myCart';

    const [quantityInput, setQuantityInput] = useState(Count);

    useEffect(() => {
        setQuantityInput(Count)
    }, [products])

    const handleQuantity = (value) => {
        setQuantityInput(value);
    }

    const plusQuantity = async () => {
        
        try{
            const checkItem = await fetch(`${API_URL}/${id}`)
            const item = await checkItem.json()
            if(checkItem.ok) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                    ...item,
                    quantity: item.quantity + 1
             } )

            })
            setQuantityInput(quantityInput + 1)
        }
        }catch(error){
            console.error();
        }finally{
            setCount()
            updateIndPrice()
        }
    }

    const minusQuantity = async () => {
        if (quantityInput > 1) {
            try{
                const checkItem = await fetch(`${API_URL}/${id}`)
                const item = await checkItem.json()
                if(checkItem.ok) {
                await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                        ...item,
                        quantity: item.quantity - 1
                 } )
    
                })
                setQuantityInput(quantityInput - 1)
            }
            }catch(error){
                console.error();
            }finally{
                setCount()
                updateIndPrice()
            }
        }
    }

    
    return (
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
    )
}

export default QuantityBox