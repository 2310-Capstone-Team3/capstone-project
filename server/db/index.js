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
} = require('./users');

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
  submitShip,
  updateOrder,
  fetchOrders,
} = require('./cart');

const {
  fetchReviews, 
  createReviews
} = require('./reviews');

const {
  fetchWorkshops,
  createWorkshops,
} = require ('./workshops');

const {
  fetchFlowers, 
  createFlowers,
} = require ('./flowers');


const seed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS productdeets;
    DROP TABLE IF EXISTS workshops;
    DROP TABLE IF EXISTS flowers;
  


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
      user_id UUID REFERENCES users(id) NOT NULL,
      shipping TEXT,
      priceTotal INTEGER
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

    CREATE TABLE reviews (
      id UUID PRIMARY KEY,
      name VARCHAR(50),
      body TEXT
  ); 

  CREATE TABLE workshops(
    id UUID PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER NOT NULL,
    duration VARCHAR(100),
    description VARCHAR(500),
  );

CREATE TABLE flowers (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  price INTEGER NOT NULL,
  origin VARCHAR(100),
  type  VARCHAR(100),
  species VARCHAR(50),
  description VARCHAR(1000),
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


      
  
  // FIX ------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [fourWkCourse, eightWkCourse, twelveWkCourse, twentyfourWkCourse] =
  await Promise.all([
    createWorkshops({
      name: "Intro to Floral Design 101",
      price: 1000,
      duration: '4 Weeks',
      description:
        "This workshop was designed for the love of flowers. Whether you just love the view or the nostalgic feeling of Summer that flowers bring, this workshop is for you! As it is very beginner-friendly, you will still leave this workshop knowing various design styles. During this course, each student will receive valuable and sustainable materials needed to create the proper flower arrangements. This material includes but is not limited to, a journal to help jot down recipe ideas, a course-assigned book dedicated to everything design, several floral-design cheat sheets, and a newly designed calendar to stay up-to-date with your progress. You also will receive oasis foam, pruners, chicken wire, color charts, several vases, wrapping paper, and ribbons to arrange like a pro. The workshop is offered from the comfort of your own home, as well as in-store at the flower shop. All flowers are provided for designs, whether students are at home or in-store. The designs created in this course will be placed into a portfolio file for students to show off. Each student will receive free and vital information for their course. As a bonus, a recording of all lectures and design demos will be provided to students. These videos provide all the information learned during the course. Each student will receive a Certificate of Completion at the end of the course!"   
}),



createWorkshops({
      name: "Intro to Prom Flowers 103",
      price: 2000,
      duration: '8 Weeks',
      description:
        "This workshop was designed for the love of prom flowers. As it is very beginner-friendly, students will leave this workshop knowing various prom design styles. This course helps those who wanna elevate and expand their designs. During this course, each student will receive valuable and sustainable materials needed to create the proper designs for prom. This material includes but is not limited to, a journal to help jot down recipe ideas, a course-assigned book dedicated to everything design, several prom-design cheat sheets, and a newly designed calendar to stay up-to-date with your progress. You also will receive pruners, ribbons, pins, and cases to create corsages and boutonnieres like a pro. The workshop is offered from the comfort of your own home, as well as in-store at the flower shop. All flowers are provided for designs, whether students are at home or in-store. The designs created in this course will be placed into a portfolio file for students to show off. Each student will receive free and vital information for their course. As a bonus, a recording of all lectures and design demos will be provided to students. These videos provide all the information learned during the course. Students in this workshop also will receive a 60-day mentorship after this class ends. Each student will receive a Certificate of Completion at the end of the course!"   
}),



createWorkshops({
      name: "Intro to Wedding Flowers 105",
      price: 2800,
      duration: '12 Weeks',
      description:
        "This workshop was designed for the love of weddings and flowers. Whether you just love the bride's dress or the beautiful bouquet her bridesmaids are holding, this workshop is for you! As it is an intermediate course, you will leave this workshop knowing various wedding design styles. This course helps those who wanna elevate and expand their designs. During this course, each student will receive valuable and sustainable materials needed to create the proper arrangements for a wedding. This material includes but is not limited to, a journal to help jot down recipe ideas, two course-assigned books dedicated to everything wedding design, several wedding-design cheat sheets, and a newly designed calendar to stay up-to-date with your progress. You also will receive oasis foam, chicken wire, color charts, pruners, several vases, wrapping paper, and ribbons to arrange like a pro. The workshop is offered from the comfort of your own home, as well as in-store at the flower shop. All flowers are provided for designs, whether students are at home or in-store. The designs created in this course will be placed into a portfolio file for students to show off. Each student will receive free and vital information for their course. As a bonus, a recording of all lectures and design demos will be provided to students. These videos provide all the information learned during the course. Students in this workshop also will receive a 90-day mentorship after this class ends. Each student will receive a Certificate of Completion at the end of the course!"   
}),


createWorkshops({
      name: "Ultimate Floral Design 107",
      price: 5000,
      duration: '24 Weeks',
      description:
        "This workshop was designed for the love of all flowers. Whether you just love the view or the nostalgic feeling of Summer that flowers bring, this workshop is for you! As it is a master course, you will leave this workshop knowing various design styles. Ultimately becoming a master in your designs. This includes everyday arrangements, prom flowers, weddings, and also corporate installations. This course helps those who wanna elevate and expand their designs. During this course, each student will receive valuable and sustainable materials needed to create the proper arrangements for a wedding. This material includes but is not limited to, a journal to help jot down recipe ideas, four course-assigned books dedicated to everything design, several design cheat sheets, and a newly designed calendar to stay up-to-date with your progress. You also will receive oasis foam, chicken wire, color charts, pruners, several vases, wrapping paper, and ribbons to arrange like a pro. This workshop is only offered in-store at the flower shop. All flowers are provided for each design created during this course. The designs created in this course will be placed into a portfolio file for students to show off. Each student will receive free and vital information for their course. As a bonus, a recording of all lectures and design demos will be provided to students. These videos provide all the information learned during the course. As a free gift, students will receive a florist bag, an apron, and a garden tool kit. Students in this workshop also will receive a 180-day mentorship after this class ends. Each student will receive a Certificate of Completion at the end of the course!"   
}),
  ]);



    // FIX ------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [firstReview, secondReview, thirdReview] = await Promise.all([
      createReviews({ name: 'John Doe', body: "OMG best course ever." }),
      createReviews({ name: 'Sally Sue', body: "This was the highlight to my wedding." }),
      createReviews({ name: 'Jimmy John', body: "They are so attentive and the flowers are beautiful." }),

  ]);





  const [oneFlower, twoFlower, threeFlower,fourFlower] = await Promise.all([
       createFlowers({
         name: "Bird of Paradise",
         price: 350,
         origin: 'South Africa, although naturalized in North, Central & South America. As well as Portugal',
         type: 'Hybrid',
         species: 'The Bird of Paradise has five Strelitzia species',
         description: 'The only flower considered to be both bird and flower. This flower screams EXOTIC! The flower itself is a group of bright blue petals with fluorescent, upright orange sepals. The blue petals are filled with alot of sugar water. They are set atop long stalks that can reach five feet in height, the flowers have a complex structure with bright colors and copious nectar to entice their bird pollinators. This flower is also a symbol of love, which is why they are the official flower given for a ninth wedding anniversary.' ,
        //  Event_status: true,
   
       }),

   createFlowers({
         name: "Anthuriums AKA Flamingo Flower",
         price: 450,
         origin: 'Colombia, Ecuador, Venezuelan Antilles, Windward Islands',
         type: 'Hybrid',
         species: 'The Anthurium has over 1,000 species',
         description:
           ' The favorite flower to a painter. Known for its beautiful palette,  which are bright red waxy, heart shaped flowers of the Anthurium plant. In fact they are not actually flowers at all but rather modified leaves called spathes. The flowers of the Anthurium are considered small and located on the spike or spadix in the center of the spathe. The spathe serves to attract pollinators, such as hummingbirds, to the plant. They typically grow about two to three feet tall. This flower is considered to be a symbol of strength and perseverance.  ',
        //  Event_status: true,
   
       }),
   
   
   createFlowers({
         name: "Orchids",
         price: 550,
         origin: 'North America, South America, Central America, Europe, Asia, the Caribbean, Africa and Australia. ',
         type: 'Hybrid',
         species: 'The orchid has over 35,000 species',
         description: 'The orchid is  one of the most alluring and captivating flowers to exist. These beautiful flowers have physical characteristics with tall, gently curving stems aka (flower spikes) and not to mention, large, waxy leaves to prevent water loss. Known for their colorful, spectacular blooms. Orchids are said to be wise because of their age. This Flower is a symbol of luxury, love, fertility, refinement, thoughtfulness, charm, and beauty. However, each colored orchid also carries additional symbolism based on its brilliant hue.' ,
  //  Event_status: true,
   
   
       }),
   
   
   createFlowers({
         name: "Lotus AKA Water Lilies ",
         price: 650,
         origin: 'East Asia, South Asia, Southeast Asia and Australia ',
         type: 'Outdoor' ,
         secondReviewpecies: 'The Lotus has two species',
         description:
           'The Lotus is the most known aquatic plant there is! It has broad floating leaves, with stems that contain air spaces. The flowers are usually found on thick stems rising several centimeters above the leaves, overlapping in a symmetrical pattern. Often the stems, leaves, and seeds of the plant have been valued in culture, cooking, and medicine since ancient times. Considering the Lotus to be one of the most sacred and ancient plants in the world. The lotus has a life cycle unlike any other plant in the world. While its roots are latched in mud, the flower submerges every night into river water and miraculously re-blooms the next morning. No other flower is that magical. In fact, once the Lotus rises from the mud, they are said to be STAIN-FREE. This flower is a symbol of purity, strength, resilience, rebirth and transcendence. Some may even label it as the lucky flower. ',
        //  Event_status:  true,
   
       }),
      ]);
   







  let orders = await fetchOrders(dylan.id);
  let cart = orders.find((order) => order.is_cart);
  let lineItem = await createLineItem({
    order_id: cart.id,
    product_id: fourWkCourse.id,
  });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({
    order_id: cart.id,
    product_id: eightWkCourse.id,
  });
  cart.is_cart = false;
  await updateOrder(cart);
  let formData = {
    street: "",
    zip: "",
    state: ""
  }
  await submitShip(formData);
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
  submitShip,
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
  fetchReviews,
  createReviews,
  fetchProductDeets,
  createProductDeets,
  fetchWorkshops,
  createWorkshops,
  fetchFlowers,
  createFlowers,
};
