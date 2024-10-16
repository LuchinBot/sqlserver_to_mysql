import { connection } from '../../mysql.js'
export class marcaModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM marca_bien;')
    return tests
  }
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM marca_bien WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }

  static async insert(descripcion, codigo_siga, updated_at, deleted_at) {
    const [rows] = await connection.query(
      'INSERT INTO marca_bien (descripcion, codigo_siga,updated_at,deleted_at) VALUES (?, ?, ?,?)',
      [descripcion, codigo_siga, updated_at, deleted_at]
    )
  }
}
