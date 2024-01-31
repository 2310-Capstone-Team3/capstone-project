import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

const DisplaySingleUser = ({users, changeVipStatus, changeAdminStatus, orders}) => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState([])
    const [vipStatus, setVipStatus] = useState('')
    const [adminStatus, setAdminStatus] = useState('')
    const [allOrders, setOrders] = useState([])

    useEffect(() => {
        setOrders(orders)
    }, [orders])

    const displayOrders = () => {
        useEffect(() => {
            const user = users.data.find(user => user.id === userId)
            // console.log(user)
            if (user != undefined){
                setUserDetails(user)
                setVipStatus(user.is_vip)
                setAdminStatus(user.is_admin)
            } else {
                console.log("User not found")
            }
        }, [userId, users.data])
        return allOrders.length > 0 ? (
            allOrders.filter(order => order.user_id === userId).map((order) => (
                <div key={order.id}>
                    <hr></hr>
                    <h3>Order id: {order.id}</h3>
                    <ul>
                        <h4>Cart Status: {order.is_cart ? "true" : "false"}</h4>
                        <h4>Created Date: {order.created_at}</h4>
                    </ul>
                    <hr></hr>
                </div>
            ))
        ) : (
            <p>No Orders Have Been Made</p>
        );
    };
    
    if (!userDetails) {
        console.log(userDetails)
        return <p>Loading...</p>
    }

    const _changeVipStatus = async(status) => {
        try {
            const response = await changeVipStatus(userDetails, status)
            setVipStatus(response.is_vip)
            setUserDetails(response)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const _changeAdminStatus = async(status) => {
        try {
            const response = await changeAdminStatus(userDetails, status)
            setAdminStatus(response.is_admin)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <nav>
                <Link to='/security/users'>Return to all users</Link>
            </nav>
            <div className="singleUserSecurity">
            <h2 style={{ textDecoration: 'underline' }}>User Account Details</h2>
            <span style={{ textAlign: 'center'}}>
                <h4>User id: {userDetails.id}</h4>
                <h4>Username: {userDetails.username}</h4>
                <h4>Email: {userDetails.email}</h4>
                <h4>VIP Status: {vipStatus ? 'true' : 'false' }</h4>
                <h4>Admin Status: {adminStatus ? 'true' : 'false' }</h4>
                <div className="singleUserSecButton">
                {vipStatus ? <button onClick={() => {_changeVipStatus(false)}} style={{backgroundColor: '#2c583b', boxShadow: '1px 2px red'}}>Remove Vip Status</button> : <button onClick={() => {_changeVipStatus(true)}} style={{backgroundColor: '#4F9D69', boxShadow: '1px 2px grey'}}>Make User Vip</button>}
                {adminStatus ? <button onClick={() => {_changeAdminStatus(false)}} style={{backgroundColor: '#2c583b', boxShadow: '1px 2px red'}}>Remove Admin Status</button> : <button onClick={() => {_changeAdminStatus(true)}} style={{backgroundColor: '#4F9D69', boxShadow: '1px 2px grey'}}>Make User Admin</button>}
                </div>
            </span>
            </div>
            <div className="singleUserSecOrders">
                <h3>User Orders</h3>
                {displayOrders()}
            </div>
        </div>
    )
}

export default DisplaySingleUser