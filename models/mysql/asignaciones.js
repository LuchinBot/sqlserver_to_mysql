import { connection } from '../../mysql.js'
export class asignacionesModel {
  static async getAll() {
    const [tests] = await connection.query('SELECT * FROM asignaciones_bien;')
    return tests
  }
  // consultar si existe el registro
  static async where(value) {
    const [tests] = await connection.query(
      'SELECT * FROM asignaciones_bien WHERE codigo_siga = ?',
      [value]
    )
    return tests
  }

  static async upsert(
    anio_asignacion,
    item_bien,
    codigo_patrimonial,
    codigo_siga,
    imagen_referencial,
    created_at,
    observaciones,
    caracteristicas,
    medidas,
    numero_serie_bien,
    codestado_conservacion_bien,
    codtipo_patrimonio,
    codgrupo_bien,
    codclase_bien,
    codfamilia_bien,
    codcatalogo_bien,
    codmarca_bien,
    coddependencia,
    codubicacion_fisica,
    codempleado,
    nombre_bien,
    modelo,
    modelo_ajustado,
    codmarca_bien_ajustado,
    nombre_bien_ajustado,
    deleted_at
  ) {
    // Primero, intenta encontrar el registro existente
    const [existingRecord] = await connection.query(
      'SELECT * FROM asignaciones_bien WHERE codigo_patrimonial = ?',
      [codigo_patrimonial]
    )

    if (existingRecord.length > 0) {
      // Si existe, actualiza el registro
      await connection.query(
        `UPDATE asignaciones_bien SET 
                anio_asignacion = ?, 
                item_bien = ?, 
                codigo_siga = ?, 
                imagen_referencial = ?, 
                created_at = ?, 
                observaciones = ?, 
                caracteristicas = ?, 
                medidas = ?, 
                numero_serie_bien = ?, 
                codestado_conservacion_bien = ?, 
                codtipo_patrimonio = ?, 
                codgrupo_bien = ?, 
                codclase_bien = ?, 
                codfamilia_bien = ?, 
                codcatalogo_bien = ?, 
                codmarca_bien = ?, 
                coddependencia = ?, 
                codubicacion_fisica = ?, 
                codempleado = ?, 
                nombre_bien = ?, 
                modelo = ?, 
                modelo_ajustado = ?, 
                codmarca_bien_ajustado = ?, 
                nombre_bien_ajustado = ?, 
                deleted_at = ? 
            WHERE codigo_patrimonial = ?`,
        [
          anio_asignacion,
          item_bien,
          codigo_siga,
          imagen_referencial,
          created_at,
          observaciones,
          caracteristicas,
          medidas,
          numero_serie_bien,
          codestado_conservacion_bien,
          codtipo_patrimonio,
          codgrupo_bien,
          codclase_bien,
          codfamilia_bien,
          codcatalogo_bien,
          codmarca_bien,
          coddependencia,
          codubicacion_fisica,
          codempleado,
          nombre_bien,
          modelo,
          modelo_ajustado,
          codmarca_bien_ajustado,
          nombre_bien_ajustado,
          deleted_at,
          codigo_patrimonial // Para la condición de actualización
        ]
      )
    } else {
      // Si no existe, inserta un nuevo registro
      await connection.query(
        'INSERT INTO asignaciones_bien (anio_asignacion,item_bien,codigo_patrimonial,codigo_siga,imagen_referencial,created_at,observaciones,caracteristicas,medidas,numero_serie_bien,codestado_conservacion_bien,codtipo_patrimonio,codgrupo_bien,codclase_bien,codfamilia_bien,codcatalogo_bien,codmarca_bien,coddependencia,codubicacion_fisica,codempleado,nombre_bien,modelo,modelo_ajustado,codmarca_bien_ajustado,nombre_bien_ajustado,deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          anio_asignacion,
          item_bien,
          codigo_patrimonial,
          codigo_siga,
          imagen_referencial,
          created_at,
          observaciones,
          caracteristicas,
          medidas,
          numero_serie_bien,
          codestado_conservacion_bien,
          codtipo_patrimonio,
          codgrupo_bien,
          codclase_bien,
          codfamilia_bien,
          codcatalogo_bien,
          codmarca_bien,
          coddependencia,
          codubicacion_fisica,
          codempleado,
          nombre_bien,
          modelo,
          modelo_ajustado,
          codmarca_bien_ajustado,
          nombre_bien_ajustado,
          deleted_at
        ]
      )
    }
  }
}
