import { connection } from '../../mysql.js'
export class catalogoModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM catalogo_bien;')
    return tests
  }
  // consultar si existe el registro
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM catalogo_bien WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }

  static async insert(descripcion, codigo_siga, created_at, deleted_at) {
    const [rows] = await connection.query(
      'INSERT INTO catalogo_bien (descripcion,codigo_siga,created_at,deleted_at) VALUES (?, ?, ?,?)',
      [descripcion, codigo_siga, created_at, deleted_at]
    )
  }
}
