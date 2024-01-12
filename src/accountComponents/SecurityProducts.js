import React from "react";
import { Link } from 'react-router-dom'

const SecurityProducts = () => {

    return (
        <div>
        <nav>
            <Link to='/security/users'>Users</Link>
            <Link to='/security/products'>Products</Link>
        </nav>
        <main>
            <h1>Security Products</h1>
        </main>
    </div>
    )
}

export default SecurityProducts