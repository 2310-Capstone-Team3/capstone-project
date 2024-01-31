import React from "react";
import { Link } from 'react-router-dom'

const SecurityUsers = ({ users }) => {
    
    const listUsers = () => {
        return users.data.map((user) => (
            <span key={user.id}>
                <Link to={`${user.id}`}>
                    <button className="securityUser">
                        <h3>User: {user.username}</h3>
                    </button>
                </Link>
            </span>
        ))
    }

    return (
        <div>
        <nav>
            <Link to='/security'>Back to security</Link>
        </nav>
        <main className="secUserMain">
            <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>Security Users</h1>
            {listUsers()}
        </main>
    </div>
    )
}

export default SecurityUsers