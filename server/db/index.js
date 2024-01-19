const client = require("./client");

const {
  fetchProducts,
  createProduct,
  changeProductName,
  changeProductDescription,
  changeProductPrice,
  changeItemVipStatus
} = require('./products');

const { fetchProductDeets, createProductDeets } = require("./productdeets");
const {
  fetchUsers,
  resetUserPassword,
  resetUserUsername,
  resetUserEmail,
  changeVipStatus,
  changeAdminStatus
} = require('./users')

const {
  createUser,
  authenticate,
  findUserByToken,
  fetchUserById,
} = require("./auth");

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders,
} = require("./cart");

const seed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS productdeets;
  


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
      vip_status BOOLEAN DEFAULT false NOT NULL
    ); 
    CREATE TABLE productdeets(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price INTEGER NOT NULL,
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
    createUser({
      username: "Dylan",
      password: "dylanpass",
      email: "dylan@team3.com",
      is_admin: true,
      is_vip: true,
    }),
    createUser({
      username: "Seth",
      password: "sethpass",
      email: "seth@team3.com",
      is_admin: true,
      is_vip: true,
    }),
    createUser({
      username: "Aubrionna",
      password: "aubrionnapass",
      email: "aubrionna@team3.com",
      is_admin: true,
      is_vip: true,
    }),
    createUser({
      username: "Elly",
      password: "ellypass",
      email: "elly@team3.com",
      is_admin: true,
      is_vip: true,
    }),
  ]);
  const [
    fourWeekCourse,
    eightWeekCourse,
    twelveWeekCourse,
    twentyFourWeekCourse,
  ] = await Promise.all([
    createProduct({
      name: "4 Week Course",
      price: 1000,
      description:
        "Our shortest section, meant to help guide those with previous experience!",
    }),
    createProduct({
      name: "8 Week Course",
      price: 2000,
      description:
        "Our shortest section for those that have minimal experience!",
    }),
    createProduct({
      name: "12 Week Course",
      price: 2800,
      description:
        "Our mid range section that helps those with little to no experience get started as a web developer!",
    }),
    createProduct({
      name: "24 Week Course",
      price: 5000,
      description:
        "Our longest section that is meant for those that either want a longer section or learn at a slower pace, goes the most in-depth!",
    }),
  ]);
  const [oneMonthCourse, twoMonthCourse, threeMonthCourse, sixMonthCourse] =
    await Promise.all([
      createProductDeets({
        name: "1 Month Course",
        price: 1000,
        materials:
          "During this course each student will receive valuable materials. This material includes, a journal, a course assigned book, several study guides, and an academy designed calendar to stay up-to-date with your work. The course is offered online, as well as a few days on campus. Each student will receive free and vital information for their course. As a bonus, a recording off all lectures and demos will be provided to students. These videos provide all the information learned during the course. Each student will receive a Certificate of Completion at the end of the course!",
        subjects:
          " Many subjects are taught during this course. Starting your first day, each student will be introduced to the fundamentals of HTML. The fundamentals of HTML will teach you how to build structure for a webpage. You then will moved forward to the fundamentals of CSS to learn how to apply styling. Once HTML & CSS is established, we will move on to learning how to store our code with GITHUB. Students will also have three webpages, developed with HTML && CSS to show off what they've learned! Each student will leave this course feeling confident enough to build a basic webpage on their own!",
      }),
      createProductDeets({
        name: "2 Month Course",
        price: 2000,
        materials:
          "For the two month program, each student receives, two course assigned books, two journals, multiple study guides & not to mention, a two-month calendar with new reminder features. Each student also will have access to a portal with all of the course materials learned. Students will receive a book of notes to go through as lectures are being taught. A breakdown book for HTML,CSS and Javascript is available to the students as well. The course is offered online, as well as a few days on campus. Each student will receive free and vital information for their course. As a bonus, a recording off all lectures and demos will be provided to students. These videos provide all the information learned during the course.Each student is also able to sign-up for a 30-day mentorship after the course ends. Each student will receive a Certificate of Completion at the end of the course!",
        subjects:
          " Many subjects are taught during this course. Starting your first day, each student will be introduced to the fundamentals of HTML, CSS and Javascript. The fundamentals of HTML and CSS will teach you how to build structure for a webpage. While, Javascript helps with the functioning. Each student will have established their GITHUB accounts. Several projects using HTML,CSS & JS will help create the perfect portfolio for students. Students will also have a six webpages, developed with HTML,CSS & JS, to show off what they've learned. Students will leave the course confident enough to create basic webpages for friends and family!",
      }),
      createProductDeets({
        name: "Three Month Course",
        price: 2800,
        materials:
          "During this course each student will receive valuable materials. This material includes, three journals, three course assigned books, several study guides, & not to mention, a three-month calendar with new reminder features. Each student also will have access to a portal with all of the course materials learned. Students will receive a book of notes to go through as lectures are being taught. A breakdown book for HTML,CSS and Javascript is available to the students as well. The course is offered online, as well as a few days on campus. Each student will receive free and vital information for their course. As a bonus, a recording off all lectures and demos will be provided to students. These videos provide all the information learned during the course. Each student is also able to sign-up for a 90-day mentorship after the course ends. Each student will receive a Certificate of Completion at the end of the course!",
        subjects:
          " Many subjects are taught during this course. Starting your first day, each student will be introduced to the fundamentals of HTML, CSS and Javascript. The fundamentals of HTML and CSS will teach you how to build structure for a webpage. While, Javascript helps with the functioning. Each student will have established their GITHUB accounts. Several projects using HTML,CSS & JS will help create the perfect portfolio for students. Students will learn how to create and deploy live web pages. Students will also have, twelve webpages developed with HTML,CSS & JS to show off what they've learned. This course will leave each student feeling confident enough to start a web-developing business, LOL!",
      }),
      createProductDeets({
        name: "Six Month Course",
        price: 5000,
        materials:
          "During this course each student will receive valuable materials. This material includes, six journals, six course assigned books, several study guides, & not to mention, a six-month calendar with new reminder features. Each student also will have access to a portal with all of the course materials learned. Students will receive a book of notes to go through as lectures are being taught. A breakdown book for HTML,CSS,JS & REACT, is available to students as well. The course is offered online, as well as a few days on campus. Each student will receive free and vital information for their course. As a bonus, a recording off all lectures and demos will be provided to students. These videos provide all the information learned during the course. Each student is also able to sign-up for a 180-day mentorship after the course ends. Each student will receive a Certificate of Completion at the end of the course!",
        subjects:
          " Many subjects are taught during this course. Starting your first day, each student will be introduced to the fundamentals of HTML, CSS and Javascript. The fundamentals of HTML and CSS will teach you how to build structure for a webpage. While, Javascript helps with the functioning. Each student will have established their GITHUB accounts. Several projects using HTML,CSS & JS REACT will help create the perfect portfolio for students. Students will learn how to create and deploy live web pages. Students will also have, twenty-four webpages developed with HTML,CSS & JS REACT to show off what they've learned. Students will use these tools to create functional webpages in-depth! This course will have you feeling confident enough to change your title to a WEB-DEVELOPER!",
      }),
    ]);

  let orders = await fetchOrders(dylan.id);
  let cart = orders.find((order) => order.is_cart);
  let lineItem = await createLineItem({
    order_id: cart.id,
    product_id: fourWeekCourse.id,
  });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({
    order_id: cart.id,
    product_id: eightWeekCourse.id,
  });
  cart.is_cart = false;
  await updateOrder(cart);
  let productDeets = await fetchProductDeets(oneMonthCourse.id);
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
  changeVipStatus,
  changeAdminStatus,
  changeProductName,
  changeProductDescription,
  changeProductPrice,
  createProduct,
  changeItemVipStatus,
  fetchProductDeets,
  createProductDeets
};
