// <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || '118.128.165.171',
    port: parseInt(process.env.DB_PORT || '13306'),
    user: process.env.DB_USER || 'erpadmin',
    password: process.env.DB_PASSWORD || 'Elqldjemals@1',
    // database: process.env.DB_NAME || 'NEW_ERP',
    database: process.env.DB_NAME ,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

console.log('Database connection configuration:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

console.log('Connecting to database...');
console.log('Connected to database');

export const sql = async ({ query, values = [] }: { query: string; values?: any[] }) => {
    console.log('Executing query:', query, 'with values:', values);
    try {
        const [rows] = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

export const transaction = async <T>(callback: (tx: any) => Promise<T>): Promise<T> => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

export default pool;