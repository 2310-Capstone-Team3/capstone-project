import axios from 'axios';


const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchProductDeets = async(setProductDeets)=> {
  const response = await axios.get('/api/productdeets');
  setProductDeets(response.data);
};


const fetchUsers = async(setUsers) => {
  const response = await axios.get('/api/users')
  setUsers(response)
}

const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const removeFromCart = async({ lineItem, lineItems, setLineItems})=> {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const plusOne = async({lineItem, lineItems, setLineItems, cart}) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const minusOne = async({lineItem, lineItems, setLineItems, cart}) => {
  if (lineItem.quantity > 1) {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
      quantity: lineItem.quantity - 1,
      order_id: cart.id
    }, getHeaders());
    return setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
  } else {
    const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
    return setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
  }
};

const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const signUp = async({ credentials }) => {
  console.log(credentials)
  try {
    return await axios.post('/api/users', credentials)
  } catch (error) {
    console.error('Error during user registration:', error)
    throw error
  }
}

const resetPassword = async({ user, password }) => {
  try {
    return await axios.patch(`/api/users/${user.id}/reset-password`, { id: user.id, password: password });
  } catch (error) {
    console.error('Error during password reset:', error)
    throw error
  }
}

const resetUsername = async({ user, username }) => {
  try {
    return await axios.patch(`/api/users/${user.id}/reset-username`, { id: user.id, username: username });
  } catch (error) {
    console.error('Error during username reset:', error)
    throw error
  }
}

const resetEmail = async({ user, email }) => {
  try {
    return await axios.patch(`/api/users/${user.id}/reset-email`, { id: user.id, email: email });
  } catch (error) {
    console.error('Error during email reset:', error)
    throw error
  }
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}

// const createDeets = async({ product, deets, setDeets}) => {
//   const response = await axios.post('/api/details/deets', {
//     product_id: product.id,
//     product_name: product.name,
//     product_price: product.price,
//     product_description: product.description,
//   }, getHeaders());
//   setDeets([...deets, response.data]);

  

const api = {
  login,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  updateOrder,
  removeFromCart,
  attemptLoginWithToken,
  plusOne,
  minusOne,
  signUp,
  fetchUsers,
  resetPassword,
  resetUsername,
  resetEmail,
  fetchProductDeets
  

};

export default api;
