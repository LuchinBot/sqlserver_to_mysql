import { connection } from '../../mysql.js'
export class tipoPatrimonioModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM tipo_patrimonio;')
    return tests
  }
  // consultar si existe el registro
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM tipo_patrimonio WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }

  static async insert(descripcion, codigo_siga, created_at, deleted_at) {
    const [rows] = await connection.query(
      'INSERT INTO tipo_patrimonio (descripcion,codigo_siga,created_at,deleted_at) VALUES (?, ?, ?,?)',
      [descripcion, codigo_siga, created_at, deleted_at]
    )
  }
}
