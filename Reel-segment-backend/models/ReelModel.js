const pool = require("../config/db.js");

const ReelModel = {
  createReel: async (videoUrl, userId) => {
    const query = `INSERT INTO reels (video_url,user_id) VALUES ($1,$2) RETURNING *`;
    const values = [videoUrl, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAllReels: async () => {
    const query = `SELECT reels.id, reels.video_url,reels.user_id,users.username FROM reels
    JOIN users ON reels.user_id = users.id
    ORDER BY reels.created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = ReelModel;
