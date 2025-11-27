// src/database.ts
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,           // localhost
  user: process.env.DB_USER,           // root
  password: process.env.DB_PASSWORD,   // Gabriel2010!
  database: process.env.DB_NAME,       // loja
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,                 // número máximo de conexões simultâneas
});

export default db;
