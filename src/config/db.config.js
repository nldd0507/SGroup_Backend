import pg from 'pg';
import { config } from './.env.config.js';

const { Pool } = pg;

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Kiểm tra sự kiện kết nối thành công
pool.on('connect', () => {
  console.log('✅ Đã kết nối thành công tới Cơ sở dữ liệu PostgreSQL!');
});

// Xử lý lỗi nếu mất kết nối đột ngột
pool.on('error', (err) => {
  console.error('❌ Lỗi kết nối Database bất ngờ:', err);
});

export default pool;
