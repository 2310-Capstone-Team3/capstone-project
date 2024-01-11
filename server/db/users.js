const client = require('./client');

const fetchUsers = async()=> {
    const SQL = `
    SELECT *
    FROM users
    `;
    const response = await client.query(SQL);
    return response.rows;
};

module.exports = {
    fetchUsers
};