import React, { useState, useEffect } from 'react';

const LoggedInDetails = ( {user, resetPassword, resetUsername, resetEmail, logout, orders, products, lineItems} ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [displayEmail, setDisplayEmail] = useState('')

    const fetchOrders = () => {
        console.log("fetching")
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
        return total
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

    useEffect(() => {
        const updateDisplayDetails = async () => {
            if (user != undefined){
                setDisplayName(user.username)
                setDisplayEmail(user.email)
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
