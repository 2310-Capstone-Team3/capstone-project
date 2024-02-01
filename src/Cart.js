import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, plusOne, minusOne, submitShip, user })=> {
  let totalItems = []
  const [totalPrice, setTotalPrice] = useState(0)
  let [isChecked, setIsChecked] = useState(false)
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

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  const calcPrice = () => {
    let total = 0
    lineItems.map((lineItem) => {
        if (lineItem.order_id === cart.id) {
            products.map((product) => {
                if (product.id === lineItem.product_id) {
                    total = total + (parseFloat(product.price.replace('$', '')) * lineItem.quantity);
                }
            })
        }
    })
    return total.toFixed(2)
  }

  return (
    <div className='CartContainer'>
      <h2 className='CartText'>Cart</h2>
      <div className='cartItemsContainer'>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <div className='productListItem' key={ lineItem.id }>
                <div>
                  <NavLink className="CartTextLink" to={`/products/${product.id}`}>{ product.name } : ({ lineItem.quantity })</NavLink>
                </div>             
              <div style={{marginRight:"10"}}>
                <button onClick={() => plusOne(lineItem)} >+</button>
                <button onClick={() => minusOne(lineItem)} >-</button>
                <button style={{width:'300px'}} onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                </div>
              </div>
            );
          })
        }
      </div>
      <br></br>
      <div className='cartDetailsContainer'>
        <h3 className='CartText'>Total Price: ${calcPrice()}</h3>
        <br />
        <form onClick={() => setFormData({street, zip, state})} onSubmit={() => submitShip(formData)}>
          <input className='cartInput' placeholder="Street" type="text" value={street} onChange={street => setStreet(street.target.value)} required disabled = {isChecked}></input>
          <input className='cartInput' placeholder="Zip/Postal Code" type="text" value={zip} onChange={zip => setZip(zip.target.value)} required disabled = {isChecked}></input>
          <select className='cartInput' onChange={state => setState(state.target.value)} disabled = {isChecked}>
            <option value={!state}>-  State  -</option>
            {stateArray.map((state) => <option key={state.stateName}>{state.stateName}</option>)}
          </select>
        </form>
        <form style={{marginLeft:'auto'}} onClick={() => {setFormData(user.address)}}  onSubmit={() => submitShip(formData)}>
          <input className='cartCheckbox' type="checkbox" checked={isChecked} onChange={checkHandler}/>
          <label className='cartText'>Use Home Address</label>
        </form>
        {
          lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button className='cartButton' onClick={()=> {
            updateOrder({...cart, is_cart: false, shipping: formData, priceTotal: totalPrice });
          }} disabled={formData === "" || !formData}>Create Order</button>: null
        }
      </div>
    </div>
  );
};

export default Cart;
