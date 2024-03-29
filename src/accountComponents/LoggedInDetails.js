import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoggedInDetails = ( { user, resetPassword, resetUsername, resetEmail, logout, orders, products, lineItems, resetAddress } ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [displayEmail, setDisplayEmail] = useState('')
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

    const fetchOrders = () => {
        return (
            <div style={{width: "95%", margin: "0", padding: "0", display: "flex", alignItems: 'center', flexDirection: "column"}}>
                {orders.map((order) => {
                    if (order.user_id === user.id && order.is_cart != true) {
                        return (
                            <div className='orderDetails' key={order.id}>
                                <h4>Order : {order.id}</h4>
                                <hr></hr>
                                {lineItems.map((lineItem) => {
                                    if (lineItem.order_id === order.id) {
                                        return (
                                            products.map((product) => {
                                                if (lineItem.product_id === product.id) {
                                                    return (
                                                        <h6 key={product.id}>{product.name} : {lineItem.quantity}</h6>
                                                    );
                                                }
                                                return null;
                                            })
                                        );
                                    }
                                    return null;
                                })}
                                <h6>Total Price : ${handlePrice(order.id)}</h6>
                                <hr></hr>
                                <h4>Date Placed : {order.created_at}</h4>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )
    }

    const handlePrice = (orderId) => {
        let total = 0
        lineItems.map((lineItem) => {
            if (lineItem.order_id === orderId) {
                products.map((product) => {
                    if (product.id === lineItem.product_id) {
                        total = total + (parseFloat(product.price.replace('$', '')) * lineItem.quantity);
                    }
                })
            }
        })
        return total.toFixed(2)
    }

    const _changeUsername = async (ev) => {
        ev.preventDefault();
        try {
            const response = await resetUsername(user, username)
            console.log("Success changing username")
            setDisplayName(response.username)
        } catch (error) {
            console.error("An error occurr ed:", error);
        }
        setUsername('')
    }

    const _changePassword = async (ev) => {
        ev.preventDefault();
        try {
            const response = await resetPassword(user, password)
            console.log("Success changing password")
        } catch (error) {
            console.error("An error occurred:", error);
        }
        setPassword('')
    }

    const _changeEmail = async (ev) => {
        ev.preventDefault();
        try {
            const response = await resetEmail(user, email)
            console.log("Success changing email")
            setDisplayEmail(response.email)
        } catch (error) {
            console.error("An error occurred:", error);
        }
        setEmail('')
    }

    const _changeAddress = async (ev) => {
        ev.preventDefault();
        try {
            console.log(address)
            const response = await resetAddress(user, address)
            console.log("Success changing home address")
            setDisplayAddress(response.address)
        } catch (error) {
            console.error("An error occurred:", error);
        }
        setAddress('')
    }

    useEffect(() => {
        const updateDisplayDetails = async () => {
            if (user != undefined){
                setDisplayName(user.username)
                setDisplayEmail(user.email)
                if(!user.address) {
                    setDisplayAddress("No Home Set!")
                } else {
                setDisplayAddress(user.address.replace(/[{}"]/g, ""))
                }
            } else {
                console.log("User doesnt exist")
            }
        };
        updateDisplayDetails();
    }, []);

    if (user != undefined) {
        return (
            <main className='indivAccountContainerMain'>
                <h1>Account Details</h1>
                <div className='indivAccountContainer'>
                    <div className='accountDetailsContainer'>
                        <span>
                        <h2>Account details for {displayName}</h2>
                        </span>
                        <div className='accountDetails'>
                        <br></br>
                        <h4>Your username is {displayName}</h4>
                        <form className='detailsForm' name='changeUsername' onSubmit = {_changeUsername}>
                            <input
                                placeholder='username'
                                value={ username }
                                onChange={ ev => setUsername(ev.target.value)}
                            />
                            <button disabled={!username}>Change Username</button>
                        </form>
                        <form className='detailsForm' name='changePassword' onSubmit = {_changePassword}>
                            <input
                            type='password'
                                placeholder='password'
                                value={ password }
                                onChange={ ev => setPassword(ev.target.value)}
                            />
                            <button disabled={!password}>Change Password</button>
                        </form>
                        <h4>Your email is {displayEmail}</h4>
                        <form className='detailsForm' name='changeEmail' onSubmit = {_changeEmail}>
                            <input
                            type='email'
                                placeholder='email'
                                value={ email }
                                onChange={ ev => setEmail(ev.target.value)}
                            />
                            <button disabled={!email}>Change Email</button>
                        </form>
                        <h4>Your home address is set to: {displayAddress}</h4>
                        <form name='changeAddress' onSubmit = {_changeAddress}>
                            <input
                                placeholder='Street'
                                value={ addressStreet }
                                onChange={ ev => setAddressStreet(ev.target.value)}
                            />
                            <input
                                placeholder='Zip'
                                value={ addressZip }
                                onChange={ ev => setAddressZip(ev.target.value)}
                            />
                            <select onChange={addressState => setAddressState(addressState.target.value)}>
                                <option value={!addressState}>-- State --</option>
                                {stateArray.map((state) => <option key={state.stateName}>{state.stateName}</option>)}
                            </select>
                            <button disabled={!addressStreet || !addressZip || !addressState} onClick={() => setAddress(["street: " + addressStreet, " zip: " + addressZip, " " + addressState])}>Change Home Address</button>
                        </form>
                        {user.is_vip === true && (
                        <div>
                        <span style={{ display: 'flex', alignItems: 'center'}}>
                        <h4>You are a vip member!</h4> 
                        </span>
                    </div>
                    )}
                    <button onClick={logout} className='accountDetailsButton'>Logout</button>
                    </div>
                        </div>
                    <div className='accountOrdersContainer'>
                        <h2>Order History</h2>
                        <div className='ordersDisplayDiv'>
                            {fetchOrders()}
                        </div>
                    </div>
                </div>
                {user.is_admin ? <Link style={{color:"black"}} to='/security'>Admin Portal</Link> : null}
            </main>
        )
    } else {
        console.log("User not found")
    }
}

export default LoggedInDetails


{/* <div>
<span>
<h2>Account details for {displayName}</h2>
</span>
<br></br>
<h4>Your username is {displayName}</h4>
<form name='changeUsername' onSubmit = {_changeUsername}>
    <input
        placeholder='username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
    />
    <button disabled={!username}>Change Username</button>
</form>
<form name='changePassword' onSubmit = {_changePassword}>
    <input
    type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
    />
    <button disabled={!password}>Change Password</button>
</form>
<h4>Your email is {displayEmail}</h4>
<form name='changeEmail' onSubmit = {_changeEmail}>
    <input
    type='email'
        placeholder='email'
        value={ email }
        onChange={ ev => setEmail(ev.target.value)}
    />
    <button disabled={!email}>Change Email</button>
</form>
{user.is_vip === true && (
<div>
<span style={{ display: 'flex', alignItems: 'center'}}>
<img
    src='https://seeklogo.com/images/S/shiny-golden-button-logo-D5756B919D-seeklogo.com.png?v=638258827760000000'
    alt='null'
    style={{ width: '20px', height: '20px', paddingRight: '5px' }}
/>
<h4>You are a vip member!</h4> 
<button onClick={logout}></button>
</span>
</div>
)}
</div> */}
