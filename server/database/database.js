import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '118.128.165.171',
  user: process.env.DB_USER || 'erpadmin',
  password: process.env.DB_PASSWORD || 'Elqldjemals@1',
  database: process.env.DB_NAME || 'NEW_ERP',
  port: process.env.DB_PORT || '13306',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 데이터베이스 연결 테스트
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('데이터베이스에 성공적으로 연결되었습니다.'); // 연결 성공 메시지
    connection.release(); // 연결 해제
  } catch (error) {
    console.error('데이터베이스 연결 오류:', error); // 연결 오류 메시지
  }
};

testConnection(); // 연결 테스트 함수 호출
export default pool;
