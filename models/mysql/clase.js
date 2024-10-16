import { connection } from '../../mysql.js'
export class claseModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM clase_bien;')
    return tests
  }
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM clase_bien WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }

  static async insert(
    codgrupo_bien,
    descripcion,
    concepto,
    codigo_siga,
    created_at,
    updated_at,
    deleted_at
  ) {
    const [rows] = await connection.query(
      'INSERT INTO clase_bien (codgrupo_bien,descripcion, concepto,codigo_siga, created_at,updated_at,deleted_at) VALUES (?, ?, ?,?,?,?,?)',
      [
        codgrupo_bien,
        descripcion,
        concepto,
        codigo_siga,
        created_at,
        updated_at,
        deleted_at
      ]
    )
  }
}
