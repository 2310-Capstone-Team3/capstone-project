const client = require('./client');
const bcrypt = require('bcrypt');

const fetchUsers = async()=> {
    const SQL = `
    SELECT *
    FROM users
    `;
    const response = await client.query(SQL);
    return response.rows;
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

const resetUserUsername = async (userId, newUsername) => {
    try {
        const SQL = `
        UPDATE users
        SET username = $1
        WHERE id = $2
        RETURNING id, username, email, is_admin, is_vip;
        `;
        
        const response = await client.query(SQL, [newUsername, userId])
        
        if (!response.rows.length) {
            throw Error('User not found')
        }
        
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const resetUserEmail = async (userId, newEmail) => {
    try {
        
        const SQL = `
        UPDATE users
        SET email = $1
        WHERE id = $2
        RETURNING id, username, email, is_admin, is_vip;
        `;
        
        const response = await client.query(SQL, [newEmail, userId])
        
        if (!response.rows.length) {
            throw Error('User not found')
        }
        
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const changeVipStatus = async (userId, status) => {
    try {
        const SQL = `
        UPDATE users
        SET is_vip = $1
        WHERE id = $2
        RETURNING id, username, email, is_admin, is_vip;
        `

        const response = await client.query(SQL, [status, userId])

        if (!response.rows.length) {
            throw Error('User not found')
        }

        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const changeAdminStatus = async (userId, status) => {
    try {
        const SQL = `
        UPDATE users
        SET is_admin = $1
        WHERE id = $2
        RETURNING id, username, email, is_admin, is_vip;
        `

        const response = await client.query(SQL, [status, userId])

        if (!response.rows.length) {
            throw Error('User not found')
        }

        return response.rows[0]
    } catch (error) {
        throw error
    }
}

module.exports = {
    fetchUsers,
    resetUserPassword,
    resetUserUsername,
    resetUserEmail,
    changeVipStatus,
    changeAdminStatus
};