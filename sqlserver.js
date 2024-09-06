import sqlserver from 'mssql'
import dotenv from 'dotenv'
dotenv.config()
const sqlConfig = {
    user: process.env.DBSS_USER,
    password: process.env.DBSS_PWD,
    database: process.env.DBSS_NAME,
    server: "localhost",
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }


const connectSQLServer = await sqlserver.connect(sqlConfig)

export { connectSQLServer }
