import React from "react";
import { Link } from 'react-router-dom'

const SecurityUsers = ({ users }) => {
    
    const listUsers = () => {
        return users.data.map((user) => (
            <span key={user.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Link to={`${user.id}`}>
                    <button>
                        <h3>User: {user.username}</h3>
                    </button>
                </Link>
            </span>
        ))
    }

    return (
        <div>
        <nav>
            <Link to='/security/users'>Users</Link>
            <Link to='/security/products'>Products</Link>
        </nav>
        <main>
            <h1>Security Users</h1>
            {listUsers()}
        </main>
    </div>
    )
}

export default SecurityUsers