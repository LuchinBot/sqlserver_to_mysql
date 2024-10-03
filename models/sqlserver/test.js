import { sqlserver } from '../../sqlserver.js'
export class test2Model {
  static async getAll(table) {
    var request = new sqlserver.Request()
    var result = await request.query('SELECT * FROM ' + table)
    return result.recordset
  }
  static async getCentroCosto(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM SIG_CENTRO_COSTO')
    } else {
      result = await request.query(
        'SELECT * FROM SIG_CENTRO_COSTO ORDER BY ANO_EJE, SEC_EJEC, CENTRO_COSTO, FECHA_ALTA OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
  static async getUbicacionFisica(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM SIG_UBICAC_FISICA')
    } else {
      result = await request.query(
        'SELECT * FROM SIG_UBICAC_FISICA ORDER BY TIPO_UBICAC, COD_UBICAC OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
  static async getPersonal(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM SIG_PERSONAL')
    } else {
      result = await request.query(
        'SELECT * FROM SIG_PERSONAL ORDER BY sec_ejec, docum_ident OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
  static async getTipoPatrimonio(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM SIG_TIPO_PATRIMONIO')
    } else {
      result = await request.query(
        'SELECT * FROM SIG_TIPO_PATRIMONIO ORDER BY tipo_patrim, clase_patrim OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
  static async getMarca(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM MARCA')
    } else {
      result = await request.query(
        'SELECT * FROM MARCA ORDER BY TIPO_MARCA, MARCA, NOMBRE OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
  static async getGrupo(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM GRUPO_BIEN_SERV')
    } else {
      result = await request.query(
        'SELECT * FROM GRUPO_BIEN_SERV ORDER BY tipo_bien, grupo_bien, nombre_grupo OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
  static async getClase(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM CLASE_BIEN_SERV')
    } else {
      result = await request.query(
        'SELECT * FROM CLASE_BIEN_SERV ORDER BY tipo_bien, grupo_bien, clase_bien, nombre_clase OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
    return result.recordset
  }
  static async getFamilia(fetch, limit) {
    var request = new sqlserver.Request()
    var result
    if (fetch == null && limit == null) {
      result = await request.query('SELECT * FROM FAMILIA_BIEN_SERV')
    } else {
      result = await request.query(
        'SELECT * FROM FAMILIA_BIEN_SERV ORDER BY tipo_bien, grupo_bien, clase_bien, familia_bien, nombre_fam OFFSET ' +
          fetch +
          ' ROWS FETCH NEXT ' +
          limit +
          ' ROWS ONLY'
      )
    }
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
