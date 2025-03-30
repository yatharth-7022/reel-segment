const pool = require("../config/db.js");

const UserModel = {
  createUser: async (username, email, hashedPassword) => {
    const query = `INSERT INTO users (username,email,hashedPassword) VALUES ($1,$2,$3) RETURNING *`;
    const values = [username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findUserByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(query, values);
  },
};
