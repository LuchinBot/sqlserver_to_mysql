import { connection } from '../../mysql.js'
export class dependenciaModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM dependencia;')
    return tests
  }
  // consultar si existe el registro
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM dependencia WHERE descripcion = ?',
      [value]
    )
    return tests
  }

  static async update(codempleado_responsable, codpersona_responsable) {
    const [rows] = await connection.query(
      'UPDATE dependencia SET codempleado_responsable = ?, codpersona_responsable = ?',
      [codempleado_responsable, codpersona_responsable]
    )
  }

  static async insert(descripcion, mostrar_en_web, updated_at) {
    const [rows] = await connection.query(
      'INSERT INTO dependencia (descripcion, mostrar_en_web, updated_at) VALUES (?, ?, ?)',
      [descripcion, mostrar_en_web, updated_at]
    )
  }
}
