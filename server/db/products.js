const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchProducts = async () => {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async (product) => {
  const SQL = `
    INSERT INTO products (id, name, price, description, product_type, plant_type, workshop_duration, product_image_path) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    product.name,
    product.price,
    product.description,
    product.product_type,
    product.plant_type,
    product.workshop_duration,
    product.image_path
  ]);
  return response.rows[0];
};

const changeProductName = async (productId, name) => {
  console.log("idend:", productId)
  try {
      const SQL = `
      UPDATE products
      SET name = $1
      WHERE id = $2
      RETURNING id, name, price, description, product_type, plant_type, workshop_duration, product_image_path, vip_status;
      `

      const response = await client.query(SQL, [name, productId])

      if (!response.rows.length) {
          throw Error('Product not found')
      }

      return response.rows[0]
  } catch (error) {
      throw error
  }
}

const changeProductDescription = async (productId, description) => {
  try {
      const SQL = `
      UPDATE products
      SET description = $1
      WHERE id = $2
      RETURNING id, name, price, description, product_type, plant_type, workshop_duration, product_image_path, vip_status;      
      `

      const response = await client.query(SQL, [description, productId])

      if (!response.rows.length) {
          throw Error('Product not found')
      }

      return response.rows[0]
  } catch (error) {
      throw error
  }
}

const changeProductPrice = async (productId, price) => {
  try {
      const SQL = `
      UPDATE products
      SET price = $1
      WHERE id = $2
      RETURNING id, name, price, description, product_type, plant_type, workshop_duration, product_image_path, vip_status;
      `

      const response = await client.query(SQL, [price, productId])

      if (!response.rows.length) {
          throw Error('Product not found')
      }

      return response.rows[0]
  } catch (error) {
      throw error
  }
}

const changeItemVipStatus = async (productId, status) => {
  try {
      const SQL = `
      UPDATE products
      SET vip_status = $1
      WHERE id = $2
      RETURNING id, name, price, description, product_type, plant_type, workshop_duration, product_image_path, vip_status;      
      `

      const response = await client.query(SQL, [status, productId])

      if (!response.rows.length) {
          throw Error('Product not found')
      }

      return response.rows[0]
  } catch (error) {
      throw error
  }
}

module.exports = {
  fetchProducts,
  createProduct,
  changeProductName,
  changeProductDescription,
  changeProductPrice,
  changeItemVipStatus
};
