import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const config = {
  host: 'localhost',
  port: 3306,
  user: process.env.DBMS_USER,
  password: process.env.DBMS_PWD,
  database: process.env.DBMS_NAME
}

const connection = await mysql.createConnection(config)

export { connection }