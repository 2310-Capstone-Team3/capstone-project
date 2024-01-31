import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

const DisplaySingleProduct = ({ products, changeProductName, changeProductDescription, changeProductPrice, changeItemVipStatus}) => {
    const [product, setProduct] = useState('')
    const { productId } = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        const targetProduct = products.find(product => product.id === productId)
        setProduct(targetProduct)
    }, [productId, products])

    const _changeName = async(ev) => {
        ev.preventDefault()
        console.log("test")
        try {
            const response = await changeProductName(productId, name)
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const _changeDescription = async(ev) => {
        ev.preventDefault()
        console.log("test")
        try {
            const response = await changeProductDescription(productId, description)
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const _changePrice = async(ev) => {
        ev.preventDefault()
        console.log("test")
        try {
            const response = await changeProductPrice(productId, price)
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const _changeItemVipStatus = async(status) => {
        try {
            console.log("status:", status)
            const response = await changeItemVipStatus(productId, status)
            console.log(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    if (product != undefined) {
    return (
        <div>
            <nav>
                <Link to='/security/products'>Return to all products</Link>
            </nav>
            <div>
            <span>
            <h2>Product details for {product.id}</h2>
            </span>
            <br></br>
            <h4 style={{marginLeft: '1%'}}>Product name: {product.name}</h4>
            <form name='changeName' onSubmit = {_changeName}>
                <input
                    placeholder='name'
                    value={ name }
                    onChange={ ev => setName(ev.target.value)}
                />
                <button disabled={!name} style={{backgroundColor: '#478a5d', boxShadow: '2px 2px black'}}>Change Name</button>
            </form>
            <h4 style={{marginLeft: '1%'}}>Product decription: {product.description}</h4>
            <form name='changeDescription' onSubmit = {_changeDescription}>
                <input
                    placeholder='description'
                    value={ description }
                    onChange={ ev => setDescription(ev.target.value)}
                />
                <button disabled={!description} style={{backgroundColor: '#478a5d', boxShadow: '2px 2px black'}}>Change Description</button>
            </form>
            <h4 style={{marginLeft: '1%'}}>Product price: {product.price}</h4>
            <form name='changePrice' onSubmit = {_changePrice}>
                <input
                    type="number"
                    placeholder='price'
                    value={ price }
                    onChange={ ev => setPrice(ev.target.value)}
                />
                <button disabled={!price} style={{backgroundColor: '#478a5d', boxShadow: '2px 2px black'}}>Change Price</button>
            </form>
            <h4 style={{marginLeft: '1%'}}>Vip Only: {product.vip_status ? "true" : "false"}</h4>
            {product.vip_status ? <button onClick={() => {_changeItemVipStatus(false)}} style={{backgroundColor: '#478a5d', boxShadow: '2px 2px black'}}>Make Item Public</button> : <button onClick={() => {_changeItemVipStatus(true)}} style={{backgroundColor: '#478a5d', boxShadow: '2px 2px black'}}>Make Vip Only</button>}
            </div>
        </div>
        )
    } else {
        console.log("Product not found")
    }
}

export default DisplaySingleProduct