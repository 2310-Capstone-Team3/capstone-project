// const client = require("./client");
// const { v4 } = require("uuid");
// const uuidv4 = v4;

// const fetchDetails = async () => {
//     const SQL = `
//     SELECT *
//     FROM details
//     `;
//     const response = await client.query(SQL);
//   return response.rows;
// };

// const createDetails = async (detail) => {
//     const SQL = `
//       INSERT  INTO details(id, product_name, product_price, materials, duration ) VALUES (
//         $1,
//         (SELECT name FROM products WHERE name = $2),
//         (SELECT price FROM products WHERE price = $3),
//         $4,
//         $5)
//         RETURNING *
//         `;
//         const response = await client.query(SQL, [
//             uuidv4(),
//             detail.product_name,
//             detail.product_price,
//             detail.materials,
//             detail.duration
//           ]);
//           return response.rows[0];
        
//       }