const pool = require("../config/db.js");

const ReelModel = {
  createReel: async (videoUrl, userId, caption) => {
    const query = `INSERT INTO reels (video_url,user_id,caption) VALUES ($1,$2,$3) RETURNING *`;
    const values = [videoUrl, userId, caption];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAllReels: async (limit, offset) => {
    const query = `SELECT reels.id, reels.video_url,reels.caption,reels.user_id,users.username FROM reels
    JOIN users ON reels.user_id = users.id
    ORDER BY reels.created_at DESC
    LIMIT $1 OFFSET $2`;
    const values = [limit, offset];
    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = ReelModel;
