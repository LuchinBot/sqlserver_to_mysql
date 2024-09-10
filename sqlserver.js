import sqlserver from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const dbSettings = {
  user : process.env.DBSS_USER,
  password : process.env.DBSS_PWD,
  server : process.env.DBSS_SERVER,
  database : process.env.DBSS_NAME,
  options: {
    encrypt: false
  }
}
sqlserver.connect(dbSettings, err => {
  if (err) {
      throw err;
  }
  console.log("Connection Successful!");
});
export {sqlserver}