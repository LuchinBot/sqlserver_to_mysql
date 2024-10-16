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

  static async insert(
    codgrupo_bien,
    codclase_bien,
    codfamilia_bien,
    item_bien,
    nombre,
    codigo_siga,
    created_at,
    updated_at,
    deleted_at
  ) {
    const [rows] = await connection.query(
      'INSERT INTO catalogo_bien (codgrupo_bien, codclase_bien, codfamilia_bien, item_bien, nombre, codigo_siga, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        codgrupo_bien,
        codclase_bien,
        codfamilia_bien,
        item_bien,
        nombre,
        codigo_siga,
        created_at,
        updated_at,
        deleted_at
      ]
    )
  }

  static async update(updated_at, deleted_at) {
    const [rows] = await connection.query(
      'UPDATE catalogo_bien SET updated_at = ?, deleted_at = ? WHERE deleted_at IS NULL',
      [updated_at, deleted_at]
    )
  }
}
