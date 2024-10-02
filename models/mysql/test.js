import { connection } from '../../mysql.js'
export class testModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM SIG_PERSONAL;')
    return tests
  }
  // Funcion para insertar registros
  static async insert(table, records) {
    const sql = `INSERT INTO ${table} (${Object.keys(records[0]).join(
      ','
    )}) VALUES ?`
    const values = records.map((record) => Object.values(record))
    // Insertar los registros
    connection.query(sql, [values])
  }
  // Funcion para vaciar una tabla
  static async truncate(table) {
    await connection.query(`TRUNCATE TABLE ${table};`)
  }
}
