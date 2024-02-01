const client = require("./client");

const {
  fetchProducts,
  createProduct,
  changeProductName,
  changeProductDescription,
  changeProductPrice,
  changeItemVipStatus
} = require('./products');

const {
  fetchUsers,
  resetUserPassword,
  resetUserUsername,
  resetUserEmail,
  resetUserAddress,
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
  submitShip,
  updateOrder,
  fetchOrders,
} = require('./cart');

const {
  createReview,
  fetchReview,
  newReview,
  
} = require ('./reviews');

const seed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS reviews;
   
  
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      email VARCHAR(256) UNIQUE NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL,
      address VARCHAR(256)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price VARCHAR(15) NOT NULL,
      description TEXT,
      product_type VARCHAR(50),
      plant_type VARCHAR(50),
      workshop_duration VARCHAR(50),
      product_image_path VARCHAR(150),
      vip_status BOOLEAN DEFAULT false NOT NULL
    ); 

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      body TEXT NOT NULL
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
  `;


  await client.query(SQL);

  const [reviewOne, reviewTwo, reviewThree] = await Promise.all([
    createReview({
      name: "Samantha Huntington",
      body: "Stunning flowers, impeccable service. Highly recommend for any occasion.",
    }),
    createReview({
      name: "Chris Leone",
      body: "Exquisite bouquets, exceptional staff. Never disappoints!",
    }),
    createReview({
      name: "Bob Hart",
      body: "Fresh and unique blooms with friendly service; Always my go-to for beautiful arrangements!.",
    }),
  ]);

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
    sixWeekCourse,
    eightWeekCourse,
    fiveWeekCourse,
    tenWeekCourse,
    birdsOfParadise,
    anthuriums,
    orchids,
    lotus
  ] = await Promise.all([
    createProduct({
      product_type: "workshop",
      product_image_path: "/public/productImages/cartoongarden.png",
      workshop_duration: "6 weeks",
      name: "Mastering Flowering Plants",
      price: "$359.99",
      description:
        "Unlock the secrets of blooming beauty! This course covers the cultivation, care, and propagation of a variety of flowering plants, from annuals to perennials, providing you with the skills to create vibrant and colorful gardens.",
    }),
    createProduct({
      product_type: "workshop",
      workshop_duration: "8 weeks",
      product_image_path: "/public/productImages/cartoongarden.png",
      name: "Floral Landscape Design",
      price: "$379.99",
      description:
        "Immerse yourself in the art of floral landscape design. Explore the interplay of colors, textures, and heights to create stunning flower arrangements that transform your outdoor space into a botanical masterpiece.",
    }),
    createProduct({
      product_type: "workshop",
      product_image_path: "/public/productImages/cartoongarden.png",
      workshop_duration: "5 weeks",
      name: "Urban Flower Gardening Mastery",
      price: "$369.99",
      description:
        "Discover the joys of cultivating a flourishing urban flower garden. Learn space-efficient techniques, creative container gardening, and selecting the perfect blooms to bring bursts of color to city living.",
    }),
    createProduct({
      product_type: "workshop",
      product_image_path: "/public/productImages/cartoongarden.png",
      workshop_duration: "10 weeks",
      name: "Sustainable Flower Farming Practices",
      price: "$389.99",
      description:
        "Delve into sustainable flower farming methods. From seed to bloom, explore eco-friendly approaches to cultivating and harvesting flowers, emphasizing organic practices that benefit both the environment and your floral creations.",
    }),
    createProduct({
      product_type: "flower",
      product_image_path: "/public/productImages/birdsofparadise.webp",
      plant_type: "hybrid",
      name: "Birds of Paradise",
      price: "$149.99",
      description: "The only flower considered to be both bird and flower. This flower screams “EXOTIC”! The flower itself is a group of bright blue petals with fluorescent, upright orange sepals. The blue petals are filled with alot of sugar water. They are set atop long stalks that can reach five feet in height, the flowers have a complex structure with bright colors and copious nectar to entice their bird pollinators. This flower is also a symbol of love, which is why they are the official flower given for a ninth wedding anniversary.",
    }),
    createProduct({
      product_type: "flower",
      product_image_path: "/public/productImages/rose.webp",
      plant_type: "hybrid",
      name: "Roses",
      price: "$79.99",
      description: "Indulge in the timeless allure of our Enchanting Red Roses Bouquet. This carefully curated bouquet features a dozen of the finest red roses, each meticulously selected for its vibrant color, lush petals, and captivating fragrance. Whether you're expressing love, celebrating a special occasion, or simply brightening someone's day, this bouquet is a symbol of elegance and passion.",
    }),
    createProduct({
      product_type: "flower",
      product_image_path: "/public/productImages/anthuriums.webp",
      plant_type: "hybrid",
      name: "Anthuriums",
      price: "$189.99",
      description: "The favorite flower to a painter. Known for its beautiful “palette”,  which are bright red waxy, heart shaped flowers of the Anthurium plant. In fact they are not actually flowers at all but rather modified leaves called spathes. The flowers of the Anthurium are considered small and located on the spike or spadix in the center of the spathe. The spathe serves to attract pollinators, such as hummingbirds, to the plant. They typically grow about two to three feet tall. This flower is considered to be a symbol of strength and perseverance.",
    }),
    createProduct({
      product_type: "flower",
      product_image_path: "/public/productImages/orchid.png",
      plant_type: "hybrid",
      name: "Orchids",
      price: "$239.99",
      description: "The orchid is one of the most alluring and captivating flowers to exist. These beautiful flowers have physical characteristics with tall, gently curving stems aka (flower spikes) and not to mention, large, waxy leaves to prevent water loss. Known for their colorful, spectacular blooms. Orchids are said to be wise because of their age. This Flower is a symbol of luxury, love, fertility, refinement, thoughtfulness, charm, and beauty. However, each colored orchid also carries additional symbolism based on its brilliant hue.",
    }),
    createProduct({
      product_type: "flower",
      product_image_path: "/public/productImages/lotuses.png",
      plant_type: "outdoor",
      name: "Lotuses",
      price: "$299.99",
      description: "The Lotus is the most known aquatic plant there is! It has broad floating leaves, with stems that contain air spaces. The flowers are usually found on thick stems rising several centimeters above the leaves, overlapping in a symmetrical pattern. Often the stems, leaves, and seeds of the plant have been valued in culture, cooking, and medicine since ancient times. Considering the Lotus to be one of the most sacred and ancient plants in the world. The lotus has a life cycle unlike any other plant in the world. While its roots are latched in mud, the flower submerges every night into river water and miraculously re-blooms the next morning. No other flower is that magical. In fact, once the Lotus rises from the mud, they are said to be STAIN-FREE. This flower is a symbol of purity, strength, resilience, rebirth and transcendence. Some may even label it as the “lucky flower”.",
    }),
    createProduct({
      product_type: "tool",
      product_image_path: "/public/productImages/pruningshears.png",
      name: "Pruning Shears",
      price: "$24.99",
      description: "High-quality pruning shears designed for precision trimming of flowers and plants. These ergonomic shears feature sharp blades, a comfortable grip, and are perfect for maintaining the health and shape of your garden blooms.",
    }),
    createProduct({
      product_type: "tool",
      product_image_path: "/public/productImages/trowelandtransplanting.webp",
      name: "Garden Trowel and Transplanter Set",
      price: "$29.99",
      description: "A versatile set including a durable garden trowel and transplanter. Ideal for planting and transplanting flowers with ease. The ergonomic handles ensure a comfortable grip, and the rust-resistant construction guarantees longevity.",
    }),
    createProduct({
      product_type: "tool",
      product_image_path: "/public/productImages/wateringcan.png",
      name: "Flower Watering Can",
      price: "$19.99",
      description: "A stylish and functional watering can designed specifically for delicate flowers. The long spout provides a gentle and precise water flow, preventing soil erosion and ensuring your flowers receive the right amount of hydration.",
    }),
    createProduct({
      product_type: "tool",
      product_image_path: "/public/productImages/phmeter.png",
      name: "Soil pH Meter",
      price: "$14.99",
      description: "An essential tool for flower enthusiasts, this soil pH meter helps you monitor and adjust the acidity of your garden soil. Ensure optimal growing conditions for your flowers by accurately measuring the pH level, promoting healthy and vibrant blooms.",
    }),
    createProduct({
      product_type: "planter",
      product_image_path: "/public/productImages/smallpots.webp",
      name: "Small Ceramic Flower Pot",
      price: "$12.99",
      description: "A charming small ceramic flower pot, perfect for showcasing individual blooms or creating a mini flower arrangement. Its stylish design adds a touch of elegance to any space, making it an ideal choice for windowsills or tabletops.",
    }),
    createProduct({
      product_type: "planter",
      product_image_path: "/public/productImages/mediumbox.png",
      name: "Medium Wooden Planter Box",
      price: "$24.99",
      description: "A versatile medium-sized wooden planter box, suitable for planting a variety of flowers or herbs. The natural wood finish adds a rustic charm to your garden, patio, or balcony. Sturdy construction ensures durability and longevity.",
    }),
    createProduct({
      product_type: "planter",
      product_image_path: "/public/productImages/hangingcoco.png",
      name: "Hanging Basket with Coco Liner",
      price: "$19.99",
      description: "Elevate your floral display with a hanging basket featuring a coco liner. Perfect for trailing flowers or vines, this medium-sized basket adds a dynamic element to your garden. The sturdy chain makes it easy to suspend from hooks or brackets.",
    }),
    createProduct({
      product_type: "planter",
      product_image_path: "public/productImages/resinpots.png",
      name: "Large Resin Flower Pot",
      price: "$34.99",
      description: "A spacious and durable large resin flower pot, designed for showcasing abundant floral arrangements or larger plants. The lightweight yet sturdy construction makes it easy to move around, while the sleek design complements various outdoor settings.",
    }),
  ]);



  let orders = await fetchOrders(dylan.id);
  let cart = orders.find((order) => order.is_cart);
  let lineItem = await createLineItem({
    order_id: cart.id,
    product_id: sixWeekCourse.id,
  });
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({
    order_id: cart.id,
    product_id: eightWeekCourse.id,
  });
  cart.is_cart = false;
  await updateOrder(cart);
  let formData = {
    street: "",
    zip: "",
    state: ""
  }
  await submitShip(formData);
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
  resetUserAddress,
  changeVipStatus,
  changeAdminStatus,
  changeProductName,
  changeProductDescription,
  changeProductPrice,
  createProduct,
  changeItemVipStatus,
  createReview,
  fetchReview,
};
