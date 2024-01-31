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
import FrequentQuestions from './accountComponents/FrequentQuestions';
import Contact from './accountComponents/Contact';
import searchBar from './SearchBar';
import SingleProduct from './accountComponents/SingleProduct'

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const [users, setUsers] = useState({ data: [] });

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

  const createLineItem = async (product, lineItemQuantity) => {
    await api.createLineItem({ product, cart, lineItems, setLineItems, lineItemQuantity });
  };

  const updateLineItem = async (lineItem, lineItemQuantity) => {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems, lineItemQuantity });
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

  const resetAddress = async (user, address) => {
    const response = await api.resetAddress({ user, address });
    return response.data;
  };

  const changeVipStatus = async (user, status) => {
    const response = await api.changeVipStatus({ user, status });
    return response.data;
  };

  const changeAdminStatus = async(user, status) => {
    const response = await api.changeAdminStatus({ user, status })
    return response.data
  }

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

  const createProduct = async(name, description, price) => {
    const response = await api.createProduct({ name, description, price })
    return response
  }

  const createReviews = async(name, body) => {
    const response = await api.createReviews({ name, body })
    return response
  }

  const createWorkshops = async(name, body) => {
    const response = await api.createWorkshops({ name, body })
    return response
  }

  const createFlowers = async(name, body) => {
    const response = await api.createFlowers({ name, body })
    return response
  }

  const changeItemVipStatus = async(productId, status) => {
    const response = await api.changeItemVipStatus({ productId, status })
    return response
  }
  
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

  const fetchWorkshops = () => {
    const Workshops = Workshops.find((workshop) => workshop.id === workshop.id);
    return workshop;
  };

  const fetchReviews = () => {
    const Reviews = Reviews.find((review) => review.id === review.id);
    return review;
  };

  const fetchFlowers = () => {
    const Flowers = Flowers.find((flower) => flower.id === flower.id);
    return flower;
  };

  const handleNavClick = () => {
    window.location.reload()
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='mainBorder'>
      <div>
        {auth.id ? (
          <>
            <div className='preNavBar'>
            </div>
            <div className="navi">
              <nav>
                <button className='navButton' onClick={handleNavClick}>
                <Link to="/products" className='navComponent'>Products</Link>
                </button>
                <button className='navButton' onClick={handleNavClick}>
                <Link to="/frequent-questions" className='navComponent'>FAQ Forum</Link>
                </button>
                <button className='navButton' onClick={handleNavClick}>
                <Link to='/' className='navComponent, navTitle'><h1>Bloom Room</h1></Link>
                </button>
                <button className='navButton' onClick={handleNavClick}>
                <Link to='/contact' className='navComponent'>Contact Us</Link>
                </button>
                <div className='navComponent navPictures'>
                  <button className='navButton' onClick={handleNavClick}>
                  <Link to="/cart"><img src='/public/cart-30-32.png'></img></Link>
                  </button>
                  <button className='navButton' onClick={handleNavClick}>
                  <Link to="/account"><img src='/public/contacts-32.png'></img></Link>
                  </button>              
                </div>
              </nav>
            </div>
            <main>
              <Routes>
                <Route path='/products' element={<Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
              />}></Route>
              <Route path='/products/:productId' element={<SingleProduct
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
                lineItems = { lineItems }
              />}></Route>
                <Route path='/cart' element={<Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                plusOne = { plusOne }
                minusOne = { minusOne }
                submitShip = { submitShip }
                user = { fetchUser() }
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
                resetAddress = { resetAddress }
                logout = {logout}
                orders = {orders}
                products = {products}
                lineItems = {lineItems}
              />}></Route>
              <Route path='/security/*' element={<Security
              />}></Route>
              <Route path='/security/users/*' element={<SecurityUsers
                users = { users }
              />}></Route>
              <Route path='/security/products/*' element={<SecurityProducts
                products = { products }
                createProduct = { createProduct }
              />}></Route>
              <Route path='/security/orders' element={<SecurityOrders
                orders = { orders }
              />}></Route>
              <Route path='/security/users/:userId' element={<DisplaySingleUser
                users = { users }
                changeVipStatus = { changeVipStatus }
                changeAdminStatus = { changeAdminStatus }
                orders = { orders }
              />}></Route>
              <Route path='/security/products/:productId' element={<DisplaySingleProduct
                products = { products }
                changeProductName= { changeProductName }
                changeProductDescription= { changeProductDescription }
                changeProductPrice = { changeProductPrice }
                changeItemVipStatus = { changeItemVipStatus }
              />}></Route>
              </Routes>
            </main>
          </>
        ) : (
          <div>
            <div className='preNavBar'>
            </div>
            <div className="navi">
              <nav>
                <button className='navButton' onClick={handleNavClick}>
                <Link to="/products" className='navComponent'>Products</Link>
                </button> 
                <button className='navButton' onClick={handleNavClick}>
                <Link to="/frequent-questions" className='navComponent'>FAQ Forum</Link>
                </button> 
                <button className='navButton' onClick={handleNavClick}>
                  <Link to='/' className='navComponent, navTitle'><h1>Bloom Room</h1></Link>
                </button> 
                <button className='navButton' onClick={handleNavClick}>
                <Link to='/contact' className='navComponent'>Contact Us</Link>
                </button> 
                <button className='navButton' onClick={handleNavClick}>
                <Link to="/login" className='navComponent'>Sign in</Link>
                </button>               </nav>
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
              <Route path='/products/:productId' element={<SingleProduct
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
                            <NavLink to='/products' className="FooterNavTextLink">Products</NavLink>
                            <NavLink to='/contact' className="FooterNavTextLink">Information</NavLink>
                        </div>
                        <div className="FooterNavUser">
                            <h3 className="FooterNavText" style={{ paddingLeft: "5px" }}>User</h3>
                            {!auth.id ? 
                              <NavLink to='/login' className="FooterNavTextLink">Sign In</NavLink>
                              :
                              <NavLink onClick={handleLogout} className="FooterNavTextLink">Log Out</NavLink>
                            }
                            {auth.id ?
                            <NavLink to='/account' className="FooterNavTextLink">Account</NavLink>
                            :
                            <NavLink to='/register' className="FooterNavTextLink">Register</NavLink>
                            }
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

