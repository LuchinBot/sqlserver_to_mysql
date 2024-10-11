import { connection } from '../../mysql.js'

export class truncateModel {
  static async void(table) {
    const [rows] = await connection.query(`TRUNCATE TABLE ${table}`)

    return rows
  }
}
