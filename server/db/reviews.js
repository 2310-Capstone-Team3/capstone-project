const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const fetchReviews = async () => {
  const SQL = `
    SELECT *
    FROM reviews
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createReviews = async (review) => {
  const SQL = `
    INSERT INTO reviews (id, name, title, body) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    review.name,
    review.title,
    review.body,
  ]);
  return response.rows[0];
};


module.exports = {
 fetchReviews,
 createReviews,
};