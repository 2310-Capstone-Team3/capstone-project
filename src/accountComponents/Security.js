import React from 'react';
import { Link } from 'react-router-dom'

const Security = () => {

    return (
        <div>
            <nav>
                <Link to='/security/users'>Users</Link>
                <Link to='/security/products'>Products</Link>
                <Link to='/security/orders'>Orders</Link>
            </nav>
            <main>
                <h1>The one stop shop for all things administration!</h1>
            </main>
        </div>
    )
}

export default Security