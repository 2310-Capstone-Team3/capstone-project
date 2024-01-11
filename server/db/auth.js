const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUserByToken = async(token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT id, username, is_admin, is_vip
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if(!response.rows.length){
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  }
  catch(ex){
    console.log(ex);
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

const fetchUserById = async (userId) => {
  const SQL = `
    SELECT id, username, password, email, is_admin, is_vip
    FROM users
    WHERE id = $1
  `;
  const response = await client.query(SQL, [userId]);

  if (!response.rows.length) {
    return null;
  }

  return response.rows[0];
};

const authenticate = async(credentials)=> {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username]);
  if(!response.rows.length){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(credentials.password, response.rows[0].password);
  if(!valid){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

const createUser = async(user)=> {
  if(!user.username.trim() || !user.password.trim() || !user.email.trim()){
    throw Error('must have username, password, and email');
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
    INSERT INTO users (id, username, password, email, is_admin, is_vip) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), user.username, user.password, user.email, user.is_admin, user.is_vip ]);
  return response.rows[0];
};

const resetUserPassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const SQL = `
      UPDATE users
      SET password = $1
      WHERE id = $2
      RETURNING id, username, email, is_admin, is_vip;
    `;

    const response = await client.query(SQL, [hashedPassword, userId])

    if (!response.rows.length) {
      throw Error('User not found')
    }

    return response.rows[0]
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  authenticate,
  findUserByToken,
  fetchUserById,
  resetUserPassword
};
