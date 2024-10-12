import { connection } from '../../mysql.js'
export class estadoBienModel {
  static async getAll() {
    const [tests] = await connection.query(
      'SELECT * FROM estado_conservacion_bien;'
    )
    return tests
  }
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM estado_conservacion_bien WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }
}
