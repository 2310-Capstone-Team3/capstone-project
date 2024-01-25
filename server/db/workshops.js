const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;


const fetchWorkshops = async () => {
    const SQL = `
      SELECT *
      FROM workshops
      `;
    const response = await client.query(SQL);
    return response.rows;
   };
   
   
   const createWorkshops = async (workshop) => {
    const SQL = `
        INSERT  INTO workshops (id, name, price, duration, description )
        VALUES ( $1, $2, $3, $4, $5)
          RETURNING *
          `;
    const response = await client.query(SQL, [
      uuidv4(),
   
   
      workshop.name,
     workshop.price,
      workshop.duration,
      workshop.description,
    ]);
    return response.rows[0];
   };
   
   module.exports = {
    fetchWorkshops,
    createWorkshops,}
  
  