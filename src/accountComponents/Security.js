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
            <main style={{backgroundColor: '#59865f75', paddingTop: '10px', paddingBottom: '10px'}}>
                <h1 style={{textAlign: 'center'}}>The one stop shop for all things administration!</h1>
                <h3 style={{textAlign: 'center'}}>Use the above links to edit this website's information!</h3>
            </main>
        </div>
    )
}

export default Security