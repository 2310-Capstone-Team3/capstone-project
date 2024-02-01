import { useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

const SingleProduct = ({auth, products, cartItems, createLineItem, updateLineItem, lineItems}) => {
    const [product, setProduct] = useState (null)
    const { productId } = useParams()
    const [cartItem, setCartItem] = useState('')
    const [lineItem, setLineItem] = useState('')
    const [incrementAmount, setIncrementAmount] = useState(1);
    const navigate = useNavigate()

    useEffect(() => {
        const targetProduct = products.find((product) => product.id === productId)
        setProduct(targetProduct)
        const foundCartItem = cartItems.find(
            (lineItem) => lineItem.product_id === targetProduct.id
        );
        setCartItem(foundCartItem)
        const foundLineItem = lineItems && lineItems.find(
            (lineItem) => lineItem.product_id === productId
        );
        setLineItem(foundLineItem)
    }, [productId, products, cartItems])

    const addAmount = () => {
        setIncrementAmount(prevAmount => prevAmount + 1);
        console.log(incrementAmount);
    };

    const minusAmount = () => {
        if (incrementAmount > 1) {
            setIncrementAmount(prevAmount => prevAmount - 1);
        }
        console.log(incrementAmount);
    };

    const createProduct = async () => {
        const response = await createLineItem(product, incrementAmount)
        setIncrementAmount(1)
    }

    const updateProduct = async () => {
        await updateLineItem(cartItem, incrementAmount)
        setIncrementAmount(1)
    }

    const navToCart = () => {
        navigate('/cart')
    }

    if (product) {
        return (
            <main className='SingleProductContainer'>
                <div className='productImage'>
                    <img src={product.product_image_path}></img>
                </div>
                <div className='productDetails'>
                    <h1>{product.name}</h1>
                    <h3>{product.description}</h3>
                    <h3>Price : {product.price}</h3>
                    {auth.id ? (
                        <span className='incrementButtons'>
                            <button style={{width: "25%"}} onClick={() => addAmount()}>+</button>
                            <input
                            placeholder='amount to add'
                            value={incrementAmount}
                            className='incrementInput'
                            onChange={ ev => setIncrementAmount(ev.target.value*1)}
                            ></input>
                            <button style={{width: "25%"}} onClick={() => minusAmount()}>-</button>
                        </span>
                    ) : (
                        null
                    )}
                    {auth.id ? (
                        cartItem ? (
                        <button onClick={() => updateProduct()}>
                            Add More to Cart
                        </button>
                        
                    ) : (
                        <button onClick={() => createProduct()}>Add to Cart</button>
                    )
                    ) : null}
                    {auth.id ? (
                        <h4 style={{marginLeft:"30%"}}>Cart Amount : {cartItem ? cartItem.quantity : 0}</h4>
                        ) : (
                            null
                            )}
                            {cartItem ? <button onClick={() => navToCart()}>To Cart</button> : null}                 
                </div>
            </main>
        )
    }
}

export default SingleProduct 