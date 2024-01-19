import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

const DisplaySingleUser = ({users, changeVipStatus, changeAdminStatus}) => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState([])
    const [vipStatus, setVipStatus] = useState('')
    const [adminStatus, setAdminStatus] = useState('')
    
    
    useEffect(() => {
        const user = users.data.find(user => user.id === userId)
        console.log(user)
        if (user != undefined){
            setUserDetails(user)
            setVipStatus(user.is_vip)
            setAdminStatus(user.is_admin)
        } else {
            console.log("User not found")
        }
    }, [userId, users.data])

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
            <h2>User Details</h2>
            <h3>Account Details</h3>
            <span>
                <h4>User id: {userDetails.id}</h4>
                <h4>User username: {userDetails.username}</h4>
                <h4>User email: {userDetails.email}</h4>
                <h4>User vip status: {vipStatus ? 'true' : 'false' }</h4>
                <h4>User admin status: {adminStatus ? 'true' : 'false' }</h4>
                {vipStatus ? <button onClick={() => {_changeVipStatus(false)}}>Remove Vip Status</button> : <button onClick={() => {_changeVipStatus(true)}}>Make User Vip</button>}
                {adminStatus ? <button onClick={() => {_changeAdminStatus(false)}}>Remove Admin Status</button> : <button onClick={() => {_changeAdminStatus(true)}}>Make User Admin</button>}
            </span>
            <h3>User Orders</h3>
        </div>
    )
}

export default DisplaySingleUser