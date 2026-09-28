import pool from "../config/db.config.js";

export const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
};

export const findById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, email, age, role, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};

export const create = async ({ name, email, age, password, role = 'MEMBER' }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, age, password, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, age, role, created_at`,
    [name, email, age, password, role]
  );
  return result.rows[0];
};

export const findAll = async () => {
  const query = 'SELECT id, name, email, age, role, created_at FROM users ORDER BY id ASC';
  const { rows } = await pool.query(query);
  return rows;
};

export const update = async (id, { name, email, age }) => {
  const query = `
    UPDATE users
    SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        age = COALESCE($3, age)
    WHERE id = $4
    RETURNING id, name, email, age, role, created_at;
  `;
  const values = [name, email, age, id];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};
/**
 * 6. Xóa người dùng theo ID
 */
export const deleteById = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING id, name, email';
  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
};


export const updateAvatar = async (userId, avatarUrl) => {
  const query =
    `UPDATE users
    SET avatar_url = $1
    WHERE id = $2
    RETURNING id, name, email, avatar_url`;

  const { rows } = await pool.query(query, [avatarUrl, userId]);
  return rows[0];
}