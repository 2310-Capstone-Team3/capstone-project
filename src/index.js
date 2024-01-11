import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Account from './Account';
import api from './api';
import Register from './accountComponents/Register'
import PassReset from './accountComponents/PassReset'

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchUsers(setUsers);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);


  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };
  
  const plusOne = async(lineItem) => {
    await api.plusOne({lineItem, lineItems, setLineItems, cart});
  };

  const minusOne = async(lineItem) => {
    await api.minusOne({lineItem, lineItems, setLineItems, cart});
  };

  const decrement = async(lineItem) => {
    await api.decrement({lineItem, lineItems, setLineItems, cart});
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const signUp = async(credentials) => {
    const response = await api.signUp({ credentials })
    return response.data
  }

  const resetPassword = async(user, password) => {
    const response = await api.resetPassword({ user, password })
    return response.data
  }

  const logout = ()=> {
    api.logout(setAuth);
    navigate('/account')
  }

  return (
    <div>
      {
        auth.id ? (
          <>
            <nav>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <span>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            <main>
              <Routes>
                <Route path='/products' element={<Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
              />}></Route>
                <Route path='/cart' element={<Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                plusOne = { plusOne }
                minusOne = { minusOne }
              />}></Route>
                <Route path='/orders' element={<Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />}></Route>
              </Routes>
            </main>
            </>
        ):(
          <div>
            <nav>
              <Link to='/account'>Account</Link>
              <Link to='/products'>Products</Link>
            </nav>
            <Routes>
              <Route path='/account/*' element={<Account login = {login} signUp = {signUp} users = {users} setUsers = {setUsers}/>}></Route>
              <Route path='/products' element={<Products
              products={ products }
              cartItems = { cartItems }
              createLineItem = { createLineItem }
              updateLineItem = { updateLineItem }
              auth = { auth }
            />}></Route>
            <Route path='/register' element={<Register
                users = { users }
                signUp = { signUp }
                setUsers = { setUsers }
              />}></Route>    
            <Route path='/passreset' element={<PassReset
                users = { users }
                signUp = { signUp }
                setUsers = { setUsers }
                resetPassword = { resetPassword }
              />}></Route>    
            </Routes>
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
