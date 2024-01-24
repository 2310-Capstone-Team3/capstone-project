import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate, NavLink } from 'react-router-dom';
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
import DisplaySingleProduct from './accountComponents/DisplaySingleProduct';
import SecurityOrders from './accountComponents/SecurityOrders'
import Home from './Home';
import ProductDeets from "./ProductDeets"
import FrequentQuestions from './accountComponents/FrequentQuestions';
import Contact from './accountComponents/Contact';

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const [users, setUsers] = useState({ data: [] });
  const [productDeets, setProductDeets] = useState([]);

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
    const fetchData = async () => {
      response = await api.fetchProductDeets
      setProductDeets(response.data);
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

  const createLineItem = async (product) => {
    await api.createLineItem({ product, cart, lineItems, setLineItems });
  };

  const updateLineItem = async (lineItem) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const submitShip = async (formData, order) => {
    await api.submitShip({ formData, order, setOrders, cart, orders })
  }

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

  const changeVipStatus = async (user, status) => {
    const response = await api.changeVipStatus({ user, status });
    return response.data;
  };

  const changeAdminStatus = async (user, status) => {
    const response = await api.changeAdminStatus({ user, status });
    return response.data;
  };

  const changeProductName = async (productId, name) => {
    const response = await api.changeProductName({ productId, name });
    return response;
  };

  const changeProductDescription = async (productId, description) => {
    const response = await api.changeProductDescription({
      productId,
      description,
    });
    return response;
  };

  const changeProductPrice = async (productId, price) => {
    const response = await api.changeProductPrice({ productId, price });
    return response;
  };

  const createProduct = async (name, description, price) => {
    const response = await api.createProduct({ name, description, price });
    return response;
  };

  const changeItemVipStatus = async (productId, status) => {
    const response = await api.changeItemVipStatus({ productId, status });
    return response;
  };

  const logout = () => {
    api.logout(setAuth);
    navigate("/");
  };

  const fetchUser = () => {
    if (users) {
      const user = users.data.find((user) => user.username === auth.username);
      return user;
    } else {
      console.log("Users is empty?", users);
    }
  };
  const createProductDeets = async (name, price, materials, subjects) => {
    const response = await api.createProductDeets({
      name,
      price,
      materials,
      subjects,
    });
    return response;
  };

  return (
    <div className='mainBorder'>
      <div>
        {auth.id ? (
          <>
            <div className='preNavBar'>
            </div>
            <div className="navi">
              <nav>
                <Link to="/products" className='navComponent'>Products</Link>
                <Link to="/services" className='navComponent'>Services</Link>
                <Link to='/' className='navComponent, navTitle'><h1>Company Title</h1></Link>
                <Link to='/contact' className='navComponent'>Contact Us</Link>
                <Link to="/account" className='navComponent'>Account</Link>
                {
                auth.is_admin ? (
                <Link to='/security'>Security</Link>
                ) : (
                  null
                )}
                <span>
                  Welcome {auth.username}!<button onClick={logout}>Logout</button>
                </span>
              </nav>
            </div>
            <main>
              <Routes>
                <Route
                  path="/products"
                  element={
                    <Products
                      auth={auth}
                      products={products}
                      cartItems={cartItems}
                      createLineItem={createLineItem}
                      updateLineItem={updateLineItem}
                    />
                  }
                ></Route>
                <Route
                  path="/productdeets"
                  element={
                    <ProductDeets
                    ProductDeets={ProductDeets}

                    />
                  }
                ></Route>
                <Route
                  path="/cart"
                  element={
                    <Cart
                      cart={cart}
                      lineItems={lineItems}
                      products={products}
                      updateOrder={updateOrder}
                      removeFromCart={removeFromCart}
                      plusOne={plusOne}
                      minusOne={minusOne}
                    />
                  }
                ></Route>
                <Route
                  path="/orders"
                  element={
                    <Orders
                      orders={orders}
                      products={products}
                      lineItems={lineItems}
                    />
                  }
                ></Route>
                <Route
                  path="/account"
                  element={
                    <Account
                      authId={auth.id}
                      user={fetchUser()}
                      resetPassword={resetPassword}
                      resetUsername={resetUsername}
                      resetEmail={resetEmail}
                    />
                  }
                ></Route>
                <Route 
                  path='/security/*'
                    element={
                      <Security
                    />
                  }
                ></Route>
                <Route
                  path='/security/users/*'
                    element={
                      <SecurityUsers
                        users = { users }
                    />
                  }
                ></Route>
                <Route
                  path='/security/products/*' 
                    element={<SecurityProducts
                      products = { products }
                      createProduct = { createProduct }
                    />
                  }
                ></Route>
                <Route
                  path='/security/orders'
                    element={<SecurityOrders
                      orders = { orders }
                    />
                  }
                ></Route>
                <Route
                  path='/security/users/:userId' 
                    element={<DisplaySingleUser
                      users = { users }
                      changeVipStatus = { changeVipStatus }
                      changeAdminStatus = { changeAdminStatus }
                    />
                  }
                ></Route>
                <Route
                  path='/security/products/:productId'
                    element={<DisplaySingleProduct
                      products = { products }
                      changeProductName= { changeProductName }
                      changeProductDescription= { changeProductDescription }
                      changeProductPrice = { changeProductPrice }
                      changeItemVipStatus = { changeItemVipStatus }
                    />
                  }
                ></Route>
              </Routes>
            </main>
          </>
        ) : (
          <div>
            <div className='preNavBar'>
            </div>
            <div className="navi">
              <nav>
                <Link to="/products" className='navComponent'>Products</Link>
                <Link to="/services" className='navComponent'>Services</Link>
                <Link to='/' className='navComponent, navTitle'><h1>Company Title</h1></Link>
                <Link to='/contact' className='navComponent'>Contact Us</Link>
                <Link to="/login" className='navComponent'>Sign in</Link>
              </nav>
              </div>
              <Routes>
                <Route path='/login/*' element={<Account 
                login = {login} 
                signUp = {signUp} 
                users = {users} 
                setUsers = {setUsers}
                />}></Route>
                <Route path='/products' element={<Products
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
                auth = { auth }
              />}></Route>
              <Route
                  path="/productdeets"
                  element={
                    <ProductDeets
                  ProductDeets={ProductDeets}
                    />
                  }></Route>
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
        <Routes>
          <Route
            path="/frequent-questions"
            element={
              <FrequentQuestions     
              />
            }
          ></Route>
          <Route
            path='/' 
            element={
              <Home
              />
            }
          ></Route>
          <Route
            path='/contact' 
            element={
              <Contact
              />
            }
          ></Route>
        </Routes>
        <section className="FooterNavContainer">
                    <div className="FooterNavContent">
                        <div className="FooterNavCompany">
                            <h3 className="FooterNavText" style={{ paddingLeft: "5px" }}>Company</h3>
                            <NavLink to='/' className="FooterNavTextLink">Home</NavLink>
                            <NavLink to='/contact' className="FooterNavTextLink">Contact</NavLink>
                            <NavLink to='/frequent-questions' className="FooterNavTextLink">FAQ Forum</NavLink>
                        </div>
                        <div className="FooterNavServices">
                            <h3 className="FooterNavText" style={{ paddingLeft: "5px" }}>Collection</h3>
                            <NavLink to='/' className="FooterNavTextLink">Products</NavLink>
                            <NavLink to='/contact' className="FooterNavTextLink">Services</NavLink>
                            <NavLink to='/frequent-questions' className="FooterNavTextLink">Information</NavLink>
                        </div>
                        <div className="FooterNavUser">
                            <h3 className="FooterNavText" style={{ paddingLeft: "5px" }}>User</h3>
                            <NavLink to='/login' className="FooterNavTextLink">Sign In</NavLink>
                            <NavLink to='/register' className="FooterNavTextLink">Register</NavLink>
                            <NavLink to='/account' className="FooterNavTextLink">Account</NavLink>
                        </div>
                        <NavLink className='FooterNavLink' to='/socials'>
                        <img src="/public/socials.webp" className="FooterNavImage"></img>
                        </NavLink>
                    </div>
                </section>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
