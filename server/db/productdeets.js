const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchProductDeets = async () => {
  const SQL = `
    SELECT *
    FROM productdeets
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProductDeets = async (productdeets) => {
  const SQL = `
      INSERT  INTO productdeets (id, name, price, materials, subjects ) 
      VALUES ( $1, $2, $3, $4, $5)
        RETURNING *
        `;
  const response = await client.query(SQL, [
    uuidv4(),
    productdeets.name,
    productdeets.price,
    productdeets.materials,
    productdeets.subjects,
  ]);
  return response.rows[0];
};
module.exports = {
  fetchProductDeets,
  createProductDeets
};
