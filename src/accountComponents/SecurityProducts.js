import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const SecurityProducts = ({ products, createProduct }) => {
    const [allProducts, setProducts] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        console.log(products)
        setProducts(products)
    }, [])

    const listProducts = () => {
        console.log("inlist", allProducts)
        if (allProducts) {
            return allProducts.map((product) => (
                <span key={product.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                    <Link to={`${product.id}`}>
                        <button>
                            <h3>User: {product.name}</h3>
                        </button>
                    </Link>
                </span>
            ))
        }
    }

    const _createProduct = async(ev) => {
        ev.preventDefault()
        try {
            const response = await createProduct(name, description, price)
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        <nav>
            <Link to='/security/users'>Users</Link>
            <Link to='/security/products'>Products</Link>
        </nav>
        <main>
            <h1>Security Products</h1>
            {listProducts()}
            <br></br>
            <div>
                <form name='createProduct' onSubmit = {_createProduct}>
                    <input
                        placeholder='name'
                        value={ name }
                        onChange={ ev => setName(ev.target.value)}
                    />
                    <input
                        placeholder='description'
                        value={ description }
                        onChange={ ev => setDescription(ev.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='price'
                        value={ price }
                        onChange={ ev => setPrice(ev.target.value)}
                    />
                    <button disabled={!name || !description || !price}>Create Product</button>
                </form>
            </div>
        </main>
    </div>
    )
}

export default SecurityProducts