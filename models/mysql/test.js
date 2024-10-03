import { connection } from '../../mysql.js'
export class testModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM SIG_PERSONAL;')
    return tests
  }
  // Funcion para insertar
  static async insert(table, records) {
    // Crear la consulta SQL
    const sql = `INSERT INTO ${table} (${Object.keys(records[0]).join(
      ','
    )}) VALUES ?`
    const values = records.map((record) => Object.values(record))
    // Insertar los registros
    connection.query(sql, [values])
  }

  static async truncate(table) {
    connection.query(`TRUNCATE TABLE ${table}`)
  }
}
