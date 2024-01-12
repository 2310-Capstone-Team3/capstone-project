import React from 'react';
import { Link } from 'react-router-dom'

const Security = () => {

    return (
        <div>
            <nav>
                <Link to='/security/users'>Users</Link>
                <Link to='/security/products'>Products</Link>
            </nav>
            <main>
                <h1>Filler text, feel free to change, you are an admin user!</h1>
            </main>
        </div>
    )
}

export default Security