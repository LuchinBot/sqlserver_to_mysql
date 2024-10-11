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
