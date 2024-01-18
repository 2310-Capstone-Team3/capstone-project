import React from "react";

const ProductDeets = ({
    products,
    }) =>{
        return (
            <div>
                <ul>
                {products.map((product) => {
                          return (
                            <li key={product.id}>
                                <button>
                                {product.name} (${product.price})

                                </button>
                             
                              <br />
                              
                              <br />
                    </li>
        );
    })}
  </ul>
</div>
);
};
<hr />
// return(

//     <div>
//         <ul>
            
//         </ul>

// </div>
// )
export default ProductDeets;
