import { connection } from '../../mysql.js'
export class personaNaturalModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM persona_natural;')
    return tests
  }
  // consultar si existe el registro
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM persona_natural WHERE codpersona_natural = ?',
      [value]
    )
    return tests
  }
  static async wherePersonal(value) {
    const [tests] = await connection.query(
      'SELECT * FROM persona_natural WHERE numero_documento_identidad = ?',
      [value]
    )
    return tests
  }
}
