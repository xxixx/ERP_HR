// <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
import { createPool } from 'mysql2/promise';

interface Options {
  query: string;
  values?: any[];
}

+console.log('Connecting to database...');
const pool = createPool({
  host: '118.128.165.171',
  user: 'erpadmin',
  database: 'ERP_DB',
  password: 'Elqldjemals@1',
  port: 13306
});
+console.log('Connected to database');

export const sql = async ({ query, values }: Options) => {
+  console.log(`Executing query: ${query}, with values: ${JSON.stringify(values)}`);
  const [rows] = await pool.query(query, values);
+  console.log(`Query executed, got ${rows.length} rows`);
  return rows;
};

// <<<<<<<  1d3538fd-c738-4f27-96db-4ba2dcfe4f00  >>>>>>>
// <<<<<<<<<<<<<<  ✨ Codeium Command 🌟 >>>>>>>>>>>>>>>>
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || '118.128.165.171',
    port: parseInt(process.env.DB_PORT || '13306'),
    user: process.env.DB_USER || 'erpadmin',
    password: process.env.DB_PASSWORD || 'Elqldjemals@1',
    database: process.env.DB_NAME || 'NEW_ERP',
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
// <<<<<<<  1d3538fd-c738-4f27-96db-4ba2dcfe4f00  >>>>>>>
// export const sql = async ({ query, values }: { query: string; values: any[] }) => {
//   const [results] = await pool.execute(query, values);
//   return results;
// };