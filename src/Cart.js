import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, plusOne, minusOne, decrement })=> {
  let totalItems = []

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            {totalItems.push(product.price * lineItem.quantity)}
            return (
              <li key={ lineItem.id }>
                { product.name }
                ({ lineItem.quantity })
                <button onClick={() => plusOne(lineItem)} >+</button>
                <button onClick={() => minusOne(lineItem)} >-</button>
                <br />
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
            );
          })
        }
      </ul>
      Total Price: ${totalItems.reduce((arr, curr) => arr += curr, 0)}
      <br />
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button>: null
      }
    </div>
  );
};

export default Cart;
