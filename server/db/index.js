const client = require('./client')

const {
  fetchProducts,
  createProduct
} = require('./products');

// const {
//    createProductDetails
// } = require('./products/details');


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
      description TEXT, 
      materials TEXT,
      subjects TEXT
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
    createProduct({ name: '4 Week Course', price: 1000, description: "Our shortest section, meant to help guide those with previous experience!", materials: "During this course you will receive valuable materials. This material includes, a journal, a course assigned book, several study guides, and an academy designed calendar to stay up-to-date with your work. The class is offered online, as well as a few days on campus. You can also opt in to be added on our email list, in which you will receive free and vital information for your course. As a bonus, you will also receive a free link to a learning portal. This portal provides all the information learned during the course." , subjects: " Many subjects are taught during this course. Starting your first day, you will be introduced to the fundamentals of HTML. The fundamentals of HTML will teach you how to build structure for a webpage. You then will moved forward to the fundamentals of CSS to learn how to apply styling. Once HTML & CSS is established, we will move on to learning how to store with GITHUB. You will leave this course knowing the basic languages to develop a webpage." }),
    createProduct({ name: '8 Week Course', price: 2000, description: "Our shortest section for those that have minimal experience!",  materials: "During this course you will receive valuable materials. This material includes, two journals, two course assigned books, several study guides, and an academy designed calendar to stay up-to-date with your work. The class is offered online, as well as a few days on campus. You can also opt in to be added on our email list, in which you will receive free and vital information for your course. As a bonus, you will also receive a free link to a learning portal. This portal provides all the information learned during the course." , subjects: " Many subjects are taught during this course. Starting your first day, you will be introduced to the fundamentals of HTML. The fundamentals of HTML will teach you how to build structure for a webpage. You then will moved forward to the fundamentals of CSS to learn how to apply styling. We then will move forward to learning Javascript. You will leave this course knowing how to create a functional webpage." }),
    createProduct({ name: '12 Week Course', price: 2800, description: "Our mid range section that helps those with little to no experience get started as a web developer!",  materials: "During this course you will receive valuable materials. This material includes, a journal, a course assigned book, several study guides, and an academy designed calendar to stay up-to-date with your work. The class is offered online, as well as a few days on campus. You can also opt in to be added on our email list, in which you will receive free and vital information for your course. As a bonus, you will also receive a free link to a learning portal. This portal provides all the information learned during the course." , subjects: " Many subjects are taught during this course. Starting your first day, you will be introduced to the fundamentals of HTML. The fundamentals of HTML will teach you how to build structure for a webpage. You then will moved forward to the fundamentals of CSS to learn how to apply styling. Once HTML & CSS is established, we will move on to learning how to store with GITHUB. You will leave this course knowing the basic languages to develop a webpage." }),
    createProduct({ name: '24 Week Course', price: 5000, description: "Our longest section that is meant for those that either want a longer section or learn at a slower pace, goes the most in-depth!",  materials: "During this course you will receive valuable materials. This material includes, a journal, a course assigned book, several study guides, and an academy designed calendar to stay up-to-date with your work. The class is offered online, as well as a few days on campus. You can also opt in to be added on our email list, in which you will receive free and vital information for your course. As a bonus, you will also receive a free link to a learning portal. This portal provides all the information learned during the course." , subjects: " Many subjects are taught during this course. Starting your first day, you will be introduced to the fundamentals of HTML. The fundamentals of HTML will teach you how to build structure for a webpage. You then will moved forward to the fundamentals of CSS to learn how to apply styling. Once HTML & CSS is established, we will move on to learning how to store with GITHUB. You will leave this course knowing the basic languages to develop a webpage." }),
  ]);
  
  let orders = await fetchOrders(dylan.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: fourWeekCourse.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: eightWeekCourse.id});
  cart.is_cart = false;
  await updateOrder(cart);
  // let details = await createProductDetails ({ product_id: fourWeekCourse.id})
  
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
  //createProductDetails
};