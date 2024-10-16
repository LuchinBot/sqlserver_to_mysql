import { connection } from '../../mysql.js'
export class ubicacionFisicaModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM ubicacion_fisica;')
    return tests
  }
  // consultar si existe el registro
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM ubicacion_fisica WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }

  static async update(codempleado_responsable, codpersona_responsable) {
    const [rows] = await connection.query(
      'UPDATE ubicacion_fisica SET codempleado_responsable = ?, codpersona_responsable = ?',
      [codempleado_responsable, codpersona_responsable]
    )
  }

  static async insert(descripcion, codigo_siga, updated_at) {
    const [rows] = await connection.query(
      'INSERT INTO ubicacion_fisica (descripcion, codigo_siga, updated_at) VALUES (?, ?, ?)',
      [descripcion, codigo_siga, updated_at]
    )
  }
}
