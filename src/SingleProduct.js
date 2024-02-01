import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import SubmitReview from "./SubmitReview";
import Reviews from "./Reviews";

const SingleProduct = ({ 
    products,
    cartItems,
    createLineItem,
    updateLineItem,
    auth,
}) => {






    const [individualProduct, setProduct] = useState ('')
    const { productId } = useParams()


    useEffect(() => { 
        const targetProduct = products.find((product) => String(product.id) === productId)
        setProduct(targetProduct)
    }, [productId, products])

    if (individualProduct != undefined) {
    return (
        <div>
            <nav>
                <Link to='/products'>Return to all products</Link>
            </nav>
            <div className='singleProduct'>

            <h2>{individualProduct.name}</h2>
            <img src={individualProduct.product_image_path}></img>

            <h4>{individualProduct.description}</h4>
         
            <h4>{individualProduct.price}</h4>
           
            <h4>Vip Only: {individualProduct.vip_status ? "true" : "false"}</h4>


            </div>
        </div>
        )
    } else {
        console.log("Product not found") 
    }



    // ADD TO CART BUTTON -------------------------------
<ul>
    {/* {products.map((product) => {
        const cartItem = cartItems.find(
          (lineItem) => lineItem.product_id === product.id
        );
        return (
          <li key={product.id}>
            <div className="course">
              {individualProduct.name} (${individualProduct.price})
            </div>
            <br />
            {product.description}
            <br />
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
      })} */}








      {/* TEMPORARY REVIEW LINK BUTTON ----------------------- */}


      {auth.id ? (
              cartItem ? (
                <button onClick={() => updateLineItem(cartItem)}>
                  Add Another
                </button>
              ) : (
                <button onClick={() => createLineItem(product)}>Add</button>
              )
            ) : null}

            {/* BUTTON END---------------------------------------------- */}






{/* I am trying to link the review submit and the reviews together at the bottom of the page */}

</ul>
}


export default SingleProduct;