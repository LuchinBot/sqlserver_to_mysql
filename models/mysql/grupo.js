import { connection } from '../../mysql.js'
export class grupoModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM grupo_bien;')
    return tests
  }
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM grupo_bien WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }

  static async insert(
    descripcion,
    concepto,
    codigo_siga,
    created_at,
    updated_at,
    deleted_at
  ) {
    const [rows] = await connection.query(
      'INSERT INTO grupo_bien (descripcion, concepto,codigo_siga,created_at,updated_at,deleted_at) VALUES (?, ?, ?,?,?,?)',
      [descripcion, concepto, codigo_siga, created_at, updated_at, deleted_at]
    )
  }
}
