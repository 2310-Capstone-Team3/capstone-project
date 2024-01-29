import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

const DisplaySingleProduct = ({ products, changeProductName, changeProductDescription, changeProductPrice, changeItemVipStatus, resetAddress }) => {
    const [product, setProduct] = useState('')
    const { productId } = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [displayAddress, setDisplayAddress] = useState('')
    const [addressStreet, setAddressStreet] = useState("")
    const [addressZip, setAddressZip] = useState("")
    const [addressState, setAddressState] = useState("")
    const [address, setAddress] = useState({
        street: "",
        zip: "",
        state: ""
    })
    let stateArray = [
        {stateName: 'AL'},
        {stateName: 'AK'},
        {stateName: 'AZ'},
        {stateName: 'AR'},
        {stateName: 'CA'},
        {stateName: 'CO'},
        {stateName: 'CT'},
        {stateName: 'DE'},
        {stateName: 'FL'},
        {stateName: 'GA'},
        {stateName: 'HI'},
        {stateName: 'ID'},
        {stateName: 'IL'},
        {stateName: 'IN'},
        {stateName: 'IA'},
        {stateName: 'KS'},
        {stateName: 'KY'},
        {stateName: 'LA'},
        {stateName: 'ME'},
        {stateName: 'MD'},
        {stateName: 'MA'},
        {stateName: 'MI'},
        {stateName: 'MN'},
        {stateName: 'MS'},
        {stateName: 'MO'},
        {stateName: 'MT'},
        {stateName: 'NE'},
        {stateName: 'NV'},
        {stateName: 'NH'},
        {stateName: 'NJ'},
        {stateName: 'NM'},
        {stateName: 'NY'},
        {stateName: 'NC'},
        {stateName: 'ND'},
        {stateName: 'OH'},
        {stateName: 'OK'},
        {stateName: 'OR'},
        {stateName: 'PA'},
        {stateName: 'RI'},
        {stateName: 'SC'},
        {stateName: 'SD'},
        {stateName: 'TN'},
        {stateName: 'TX'},
        {stateName: 'UT'},
        {stateName: 'VT'},
        {stateName: 'VA'},
        {stateName: 'WA'},
        {stateName: 'WV'},
        {stateName: 'WI'},
        {stateName: 'WY'}
    ]

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
            <h4>Product name: {product.name}</h4>
            <form name='changeName' onSubmit = {_changeName}>
                <input
                    placeholder='name'
                    value={ name }
                    onChange={ ev => setName(ev.target.value)}
                />
                <button disabled={!name}>Change Name</button>
            </form>
            <h4>Product decription: {product.description}</h4>
            <form name='changeDescription' onSubmit = {_changeDescription}>
                <input
                    placeholder='description'
                    value={ description }
                    onChange={ ev => setDescription(ev.target.value)}
                />
                <button disabled={!description}>Change Description</button>
            </form>
            <h4>Product price: ${product.price}</h4>
            <form name='changePrice' onSubmit = {_changePrice}>
                <input
                    type="number"
                    placeholder='price'
                    value={ price }
                    onChange={ ev => setPrice(ev.target.value)}
                />
                <button disabled={!price}>Change Price</button>
            </form>
            <h4>Vip Only: {product.vip_status ? "true" : "false"}</h4>
            {product.vip_status ? <button onClick={() => {_changeItemVipStatus(false)}}>Make Item Public</button> : <button onClick={() => {_changeItemVipStatus(true)}}>Make Vip Only</button>}
            </div>
        </div>
        )
    } else {
        console.log("Product not found")
    }
}

export default DisplaySingleProduct