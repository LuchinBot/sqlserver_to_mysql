import { connection } from '../../mysql.js'
export class empleadoModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM empleado;')
    return tests
  }
  // Funciones de Consultar
  static async wherePersonal(value) {
    const [tests] = await connection.query(
      'SELECT * FROM empleado WHERE codpersona_natural = ?',
      [value]
    )
    return tests
  }
  static async whereIn(value) {
    const [tests] = await connection.query(
      'SELECT * FROM empleado AS e INNER JOIN persona_natural AS p ON (p.codpersona_natural = e.codpersona_natural) WHERE p.numero_documento_identidad= ?',
      [value]
    )
    return tests
  }
  static async whereAsigDni(value) {
    const [tests] = await connection.query(
      'SELECT empleado.codempleado, persona_natural.numero_documento_identidad FROM empleado INNER JOIN persona_natural ON persona_natural.codpersona_natural = empleado.codpersona_natural WHERE persona_natural.numero_documento_identidad = ?',
      [value]
    )
    return tests
  }
  static async whereAsig() {
    const [tests] = await connection.query(
      'SELECT empleado.codempleado, persona_natural.numero_documento_identidad FROM empleado INNER JOIN persona_natural ON persona_natural.codpersona_natural = empleado.codpersona_natural'
    )
    return tests
  }

  // Funciones de Insertar

  static async insert(descripcion, mostrar_en_web, updated_at) {
    const [rows] = await connection.query(
      'INSERT INTO empleado (descripcion, mostrar_en_web, updated_at) VALUES (?, ?, ?)',
      [descripcion, mostrar_en_web, updated_at]
    )
  }
  static async insertPersonal(codpersona_natural) {
    const [rows] = await connection.query(
      'INSERT INTO empleado (codpersona_natural) VALUES (?)',
      [codpersona_natural]
    )
  }
}
