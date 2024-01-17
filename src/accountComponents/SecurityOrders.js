import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SecurityOrders = ({ orders }) => {
    const [allOrders, setOrders] = useState([])

    useEffect(() => {
        setOrders(orders)
    }, [orders])

    const displayOrders = () => {
        return allOrders.length > 0 ? (
            allOrders.map((order) => (
                <div key={order.id} style={{ textAlign: 'center '}}>
                    <hr></hr>
                    <h3>Order id: {order.id}</h3>
                    <ul>
                        <h4>User id: {order.user_id}</h4>
                        <h4>Cart Status: {order.is_cart ? "true" : "false"}</h4>
                        <h4>Created Date: {order.created_at}</h4>
                    </ul>
                </div>
            ))
        ) : (
            <p>No orders available.</p>
        );
    };

    return (
        <div>
            <nav>
                <Link to='/security'>Back to security</Link>
            </nav>
            <main>
                <h1>Existing Orders</h1>
                {displayOrders()}
            </main>
        </div>
    )
}

export default SecurityOrders