const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchFlowers = async () => {
    const SQL = `
      SELECT *
      FROM flowers
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  
  const createFlowers= async (flower) => {
    const SQL = `
      INSERT INTO flowers (id, name, price, origin, type, species, description, ) VALUES($1, $2, $3, $4, $5, $6, $7 ) RETURNING *
    `;
    const response = await client.query(SQL, [
      uuidv4(),
     flower.name,
     flower.price,
     flower.origin,
     flower.type,
     flower.species,
     flower.description,
  
    ]);
    return response.rows[0];

    
  };
  module.exports = {
    fetchFlowers,
    createFlowers,}
  
  