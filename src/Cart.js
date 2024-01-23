import React, {useState} from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, plusOne, minusOne, submitShip })=> {
  let totalItems = []
  let totalPrice = 0
  let [street, setStreet] = useState("");
  let [zip, setZip] = useState("");
  let [state, setState] = useState("");
  const [formData, setFormData] = useState({
    street: "",
    zip: "",
    state: ""
  })
  let stateArray = [
    {stateName: 'AL'},
    {stateName: 'AK'},
    {stateName: 'AZ'},
    {stateName: 'AR'},
    {stateName: 'CA'},
    {stateName: 'CO'},
    {stateName: 'CT'},
    {stateName: 'DE'},
    {stateName: 'FL'},
    {stateName: 'GA'},
    {stateName: 'HI'},
    {stateName: 'ID'},
    {stateName: 'IL'},
    {stateName: 'IN'},
    {stateName: 'IA'},
    {stateName: 'KS'},
    {stateName: 'KY'},
    {stateName: 'LA'},
    {stateName: 'ME'},
    {stateName: 'MD'},
    {stateName: 'MA'},
    {stateName: 'MI'},
    {stateName: 'MN'},
    {stateName: 'MS'},
    {stateName: 'MO'},
    {stateName: 'MT'},
    {stateName: 'NE'},
    {stateName: 'NV'},
    {stateName: 'NH'},
    {stateName: 'NJ'},
    {stateName: 'NM'},
    {stateName: 'NY'},
    {stateName: 'NC'},
    {stateName: 'ND'},
    {stateName: 'OH'},
    {stateName: 'OK'},
    {stateName: 'OR'},
    {stateName: 'PA'},
    {stateName: 'RI'},
    {stateName: 'SC'},
    {stateName: 'SD'},
    {stateName: 'TN'},
    {stateName: 'TX'},
    {stateName: 'UT'},
    {stateName: 'VT'},
    {stateName: 'VA'},
    {stateName: 'WA'},
    {stateName: 'WV'},
    {stateName: 'WI'},
    {stateName: 'WY'}
  ]

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            {totalItems.push(product.price * lineItem.quantity)}
            {totalPrice = totalItems.reduce((arr, curr) => arr += curr, 0)}
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
      Total Price: ${totalPrice}
      <br />
      <form onClick={() => setFormData({street, zip, state})} onSubmit={() => submitShip(formData)}>
        <input placeholder="Street" type="text" value={street} onChange={street => setStreet(street.target.value)} required></input>
        <input placeholder="Zip/Postal Code" type="text" value={zip} onChange={zip => setZip(zip.target.value)} required></input>
        <select onChange={state => setState(state.target.value)}>
          <option value={!state}>-- State --</option>
          {stateArray.map((state) => <option key={state.stateName}>{state.stateName}</option>)}
        </select>
      </form>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          updateOrder({...cart, is_cart: false, shipping: formData, priceTotal: totalPrice });
        }} disabled={street==='' || zip==='' || state==='' || state === "false"}>Create Order</button>: null
      }
    </div>
  );
};

export default Cart;
