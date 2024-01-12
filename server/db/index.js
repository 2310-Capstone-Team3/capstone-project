const client = require('./client')

const {
  fetchProducts,
  createProduct
} = require('./products');


const {
  fetchUsers,
  resetUserPassword,
  resetUserUsername,
  resetUserEmail
} = require('./users')

const {
  createUser,
  authenticate,
  findUserByToken,
  fetchUserById
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;


    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      email VARCHAR(256) UNIQUE NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER NOT NULL,
      description TEXT
    ); 


    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

  `;
  await client.query(SQL);

  const [dylan, seth, aubrionna, elly] = await Promise.all([
    createUser({ username: 'Dylan', password: 'dylanpass', email: 'dylan@team3.com',is_admin: true, is_vip: true}),
    createUser({ username: 'Seth', password: 'sethpass', email: 'seth@team3.com', is_admin: true, is_vip: true}),
    createUser({ username: 'Aubrionna', password: 'aubrionnapass', email: 'aubrionna@team3.com', is_admin: true, is_vip: true}),
    createUser({ username: 'Elly', password: 'ellypass', email: 'elly@team3.com', is_admin: true, is_vip: true})
  ]);
  const [fourWeekCourse, eightWeekCourse, twelveWeekCourse, twentyFourWeekCourse] = await Promise.all([
    createProduct({ name: '4 Week Course', price: 1000, description: "Our shortest section, meant to help guide those with previous experience!" }),
    createProduct({ name: '8 Week Course', price: 2000, description: "Our shortest section for those that have minimal experience!" }),
    createProduct({ name: '12 Week Course', price: 2800, description: "Our mid range section that helps those with little to no experience get started as a web developer!" }),
    createProduct({ name: '24 Week Course', price: 5000, description: "Our longest section that is meant for those that either want a longer section or learn at a slower pace, goes the most in-depth!" }),
  ]);
  
  let orders = await fetchOrders(dylan.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: fourWeekCourse.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: eightWeekCourse.id});
  cart.is_cart = false;
  await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  seed,
  client,
  createUser,
  fetchUsers,
  fetchUserById,
  resetUserPassword,
  resetUserUsername,
  resetUserEmail,
};