import { sqlserver } from '../../sqlserver.js'
import _ from 'lodash'
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
  static async getCatalogo(fetch, limit) {
    var request = new sqlserver.Request()
    var sql =
      'SELECT * FROM CATALOGO_BIEN_SERV_ORIGINAL ORDER BY TIPO_BIEN, GRUPO_BIEN, CLASE_BIEN, FAMILIA_BIEN, ITEM_BIEN'
    var result
    if (fetch != null && limit != null) {
      sql =
        sql + ' OFFSET ' + fetch + ' ROWS FETCH NEXT ' + limit + ' ROWS ONLY'
    }
    result = await request.query(sql)
    return result.recordset
  }
  static async getPatrimonio(fetch, limit, empleados) {
    const request = new sqlserver.Request()
    let sql =
      'SELECT SIG_PATRIMONIO.* , SIG_PERSONAL.docum_ident, SIG_CENTRO_COSTO.NOMBRE_DEPEND ' +
      'FROM SIG_PATRIMONIO ' +
      'INNER JOIN SIG_PERSONAL ON SIG_PERSONAL.EMPLEADO = SIG_PATRIMONIO.EMPLEADO_FINAL ' +
      'INNER JOIN SIG_CENTRO_COSTO ON SIG_CENTRO_COSTO.ANO_EJE = SIG_PATRIMONIO.ANO_EJE ' +
      'AND SIG_CENTRO_COSTO.CENTRO_COSTO = SIG_PATRIMONIO.CENTRO_COSTO ' +
      'WHERE LEN(SIG_PERSONAL.docum_ident) = 8 ' +
      "AND SIG_PERSONAL.estado != 'I' " +
      'AND SIG_PATRIMONIO.NRO_MOV_BAJA IS NULL'

    // Añadir empleados a la consulta
    sql +=
      ' AND SIG_PERSONAL.docum_ident IN (' +
      empleados.map((emp) => emp.numero_documento_identidad).join(',') +
      ')'

    // Ordenamiento por defecto
    sql +=
      ' ORDER BY SIG_PATRIMONIO.SEC_EJEC, SIG_PATRIMONIO.TIPO_MODALIDAD, SIG_PATRIMONIO.SECUENCIA'

    if (fetch != null && limit != null) {
      sql += ` OFFSET ${fetch} ROWS FETCH NEXT ${limit} ROWS ONLY`
    }

    // Ejecutar la consulta
    const result = await request.query(sql)
    const rows = result.recordset
    const groupedResults = _.groupBy(rows, 'docum_ident')
    return groupedResults
  }
}
