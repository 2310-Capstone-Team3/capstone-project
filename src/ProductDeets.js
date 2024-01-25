import React from "react"

const ProductDeets = ({
  productDeets,
  
}) => {
  return (

  <div>
    <h1>Details!</h1>
    
    <ul> 
    
      
      {/* {productDeets.map((productdeet) => {
        const productDeets = productDeets.find((productdeet) => productdeet.id === productdeet.id)
        return (
          <li key={productdeet.id}>
            <h2>{productdeet.name}</h2>
            <h3>{productdeet.price}</h3>
            <h4>{productdeet.materials}</h4>
            <h5>{productdeet.subjects}</h5>

            <br />
          </li>
        );
      })} */}
    </ul> 
  </div>
  );
};

export default ProductDeets;
