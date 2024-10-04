import { sqlserver } from '../../sqlserver.js'
export class sigaModel {
  static async getAll(table) {
    var request = new sqlserver.Request()
    var result = await request.query('SELECT * FROM ' + table)
    return result.recordset
  }
  static async getCentroCosto(fetch, limit) {
    var request = new sqlserver.Request()
    var year = '2024'
    var sql =
      'SELECT NOMBRE_DEPEND, SIG_PERSONAL.docum_ident FROM SIG_CENTRO_COSTO INNER JOIN SIG_PERSONAL ON SIG_PERSONAL.empleado=SIG_CENTRO_COSTO.EMPLEADO WHERE ANO_EJE =' +
      year +
      ' GROUP BY NOMBRE_DEPEND, SIG_PERSONAL.docum_ident ORDER BY NOMBRE_DEPEND'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getUbicacionFisica(fetch, limit) {
    var request = new sqlserver.Request()
    var sql = 'SELECT * FROM SIG_UBICAC_FISICA ORDER BY TIPO_UBICAC, COD_UBICAC'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getPersonal(fetch, limit) {
    var request = new sqlserver.Request()
    var sql =
      'SELECT docum_ident FROM SIG_PERSONAL WHERE LEN(docum_ident) = 8 GROUP BY docum_ident ORDER BY docum_ident'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getTipoPatrimonio(fetch, limit) {
    var request = new sqlserver.Request()
    var sql =
      'SELECT * FROM SIG_TIPO_PATRIMONIO ORDER BY tipo_patrim, clase_patrim'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getMarca(fetch, limit) {
    var request = new sqlserver.Request()
    var sql = 'SELECT * FROM MARCA ORDER BY TIPO_MARCA, MARCA'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getGrupo(fetch, limit) {
    var request = new sqlserver.Request()
    var sql = 'SELECT * FROM GRUPO_BIEN_SERV ORDER BY tipo_bien, grupo_bien'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getClase(fetch, limit) {
    var request = new sqlserver.Request()
    var sql =
      'SELECT * FROM CLASE_BIEN_SERV ORDER BY tipo_bien, grupo_bien, clase_bien'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getFamilia(fetch, limit) {
    var request = new sqlserver.Request()
    var sql =
      'SELECT * FROM FAMILIA_BIEN_SERV ORDER BY tipo_bien, grupo_bien, clase_bien, familia_bien'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getPatrimonio(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM SIG_PATRIMONIO')
    } else {
      result = await request.query(
        'SELECT * FROM SIG_PATRIMONIO ORDER BY SEC_EJEC, CODIGO_ACTIVO, TIPO_PATRIM, CLASE_PATRIM OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
}
