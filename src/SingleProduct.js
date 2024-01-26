import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

const SingleProduct = ({
    products,
    cartItems,
    createLineItem,
    updateLineItem,
    auth,
  }) => {

    const [product, setProduct] = useState('')
    const { productId } = useParams()
 

    useEffect(() => {
        const targetProduct = products.find(product => product.id === productId)
        setProduct(targetProduct)
    }, [productId, products])


    if (product != undefined) {

        
    return (
        <div>
            <nav>
                <Link to='/products'>Return to all products</Link>
            </nav>
            <div>
            
            <br></br>
            <div className='singleProduct'>
            <h2>{product.name}</h2>

            <img src={product.product_image_path}></img>

            
            <h4>{product.description}</h4>
           
            <h4>{product.price}</h4>



                <ul>
                {products.map((product) => {
                    const cartItem = cartItems.find(
                    (lineItem) => lineItem.product_id === product.id
                    );
                    return (
                    <li key={product.id}>
                        {auth.id ? (
                        cartItem ? (
                            <button onClick={() => updateLineItem(cartItem)}>
                            Add Another
                            </button>
                        ) : (
                            <button onClick={() => createLineItem(product)}>Add</button>
                        )
                        ) : null}
                    </li>
                    );
                })}
                </ul>




           
            <h4>{product.vip_status ? "true" : "false"}</h4>
            {product.vip_status ? <button onClick={() => {_changeItemVipStatus(false)}}>Make Item Public</button> : <button onClick={() => {_changeItemVipStatus(true)}}>Make Vip Only</button>}
            </div></div>
        </div>
        )
    } else {
        console.log("Product not found")
    }
}

export default SingleProduct








// import { useParams, Link } from "react-router-dom";

// const SingleProduct = ({products}) => {
//     const params = useParams()
//     const id = params.id*1

    
//     const product = products.find ((product)=> {
//         return product.id === id
//     }) 

// if (!product) {
//     return null
// }
    
//     return (
//         <div>
//             <h1>{product.name}</h1>

       
//             <hr/>

//             <Link to='/products'>
//             Back to Products.
//             </Link>

            
//         </div>
//     )
// }

// export default SingleProduct