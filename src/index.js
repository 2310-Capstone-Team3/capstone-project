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
import Security from './accountComponents/Security';
import SecurityUsers from './accountComponents/SecurityUsers';
import SecurityProducts from './accountComponents/SecurityProducts';
import DisplaySingleUser from './accountComponents/DisplaySingleUser';
import Home from './Home';

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState([]);

  const attemptLoginWithToken = async () => {
    await api.attemptLoginWithToken(setAuth);
  };

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchUsers(setUsers);
    };
    fetchData();
  }, []);

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      const fetchData = async () => {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  const createDetails = async (product) => {
    await api.createDetails({ product, details, setDetails });
  };

  const createLineItem = async (product) => {
    await api.createLineItem({ product, cart, lineItems, setLineItems });
  };

  const updateLineItem = async (lineItem) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async (order) => {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async (lineItem) => {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const plusOne = async (lineItem) => {
    await api.plusOne({ lineItem, lineItems, setLineItems, cart });
  };

  const minusOne = async (lineItem) => {
    await api.minusOne({ lineItem, lineItems, setLineItems, cart });
  };

  const decrement = async (lineItem) => {
    await api.decrement({ lineItem, lineItems, setLineItems, cart });
  };

  const cart = orders.find((order) => order.is_cart) || {};

  const cartItems = lineItems.filter(
    (lineItem) => lineItem.order_id === cart.id
  );

  const cartCount = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  const login = async (credentials) => {
    await api.login({ credentials, setAuth });
  };

  const signUp = async (credentials) => {
    const response = await api.signUp({ credentials });
    return response.data;
  };

  const resetPassword = async (user, password) => {
    const response = await api.resetPassword({ user, password });
    return response.data;
  };

  const resetUsername = async (user, username) => {
    const response = await api.resetUsername({ user, username });
    return response.data;
  };

  const resetEmail = async (user, email) => {
    const response = await api.resetEmail({ user, email });
    return response.data;
  };

  const changeVipStatus = async(user, status) => {
    const response = await api.changeVipStatus({ user, status })
    return response.data
  }

  const changeAdminStatus = async(user, status) => {
    const response = await api.changeAdminStatus({ user, status })
    return response.data
  }
  
  const logout = () => {
    api.logout(setAuth);
    navigate("/account");
  };

  const fetchUser = () => {
    const user = users.data.find((user) => user.username === auth.username);
    return user;
  };
  const fetchDetails = () => {
    const details = products.data.find((product) => product.id === product_id);
    return details;
  };

  return (
    <div>
      {
        auth.id ? (
          <>
            <div className="navi">
            <nav>
            <Link to='/home'>Home</Link>
              <Link to='/products'>Courses ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <Link to='/account'>Account</Link>
              {
              fetchUser().is_admin === true ? (
              <Link to='/security'>Security</Link>
              ) : (
                null
              )}
              <span>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            </div>
            <main>
              <Routes>
                <Route path='/home' element={<Home/>}></Route>
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
                <Route path='/account' element={<Account
                authId = { auth.id }
                user = { fetchUser() }
                resetPassword = { resetPassword }
                resetUsername = { resetUsername }
                resetEmail = { resetEmail }
              />}></Route>
              <Route path='/security/*' element={<Security
              />}></Route>
              <Route path='/security/users/*' element={<SecurityUsers
                users = { users }
              />}></Route>
              <Route path='/security/products/*' element={<SecurityProducts
              />}></Route>
              <Route path='/security/users/:userId' element={<DisplaySingleUser
                users = {users}
                changeVipStatus = {changeVipStatus}
                changeAdminStatus = {changeAdminStatus}
              />}></Route>
              </Routes>
            </main>
            </>
        ):(
          <div>
            <div className='navi'>
            <nav>
              <Link to='/home'>Home</Link>
              <Link to='/account'>Account</Link>
              <Link to='/products'>Courses</Link>
            </nav>
            </div>
            <Routes>
              <Route path='/account/*' element={<Account 
              login = {login} 
              signUp = {signUp} 
              users = {users} 
              setUsers = {setUsers}
              />}></Route>
              <Route path='/home' element={<Home/>}</Route>
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

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
