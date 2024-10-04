import { dependenciaModel } from '../models/mysql/dependencia.js'
import { empleadoModel } from '../models/mysql/empleado.js'
import { marcaModel } from '../models/mysql/marca.js'
import { grupoModel } from '../models/mysql/grupo.js'
import { claseModel } from '../models/mysql/clase.js'
import { familiaModel } from '../models/mysql/familia.js'
import { personaNaturalModel } from '../models/mysql/persona_natural.js'
import { ubicacionFisicaModel } from '../models/mysql/ubicacion_fisica.js'
import { tipoPatrimonioModel } from '../models/mysql/tipo_patrimonio.js'
import { sigaModel } from '../models/sqlserver/siga.js'
export class CrontabController {
  static async getAll(req, res) {
    res.send('Crontab')
  }
  static async getCentroCosto(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getCentroCosto(fecth, limit)
      var cont1 = 0
      var cont2 = 0
      for (const record of records) {
        var obj = await dependenciaModel.where(record.NOMBRE_DEPEND)
        if (obj.length == 0) {
          // Añadir los que no existen
          var descripcion = record.NOMBRE_DEPEND
          var mostrar_en_web = 'N'
          var updated_at = null
          await dependenciaModel.insert(descripcion, mostrar_en_web, updated_at)
          cont1 += 1
        }

        // Insertamos y/o actulizamos el empleado responsable actual
        var dni = record.docum_ident
        console.log(dni)
        var empleado = empleadoModel.whereIn(dni)
        if (empleado.length > 0) {
          var codempleado_responsable = empleado[0].codempleado
          var codpersona_responsable = empleado[0].codpersona_natural
          await dependenciaModel.update(
            codempleado_responsable,
            codpersona_responsable
          )
          cont2 += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont1 + ' - ' + cont2
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getUbicacionFisica(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getUbicacionFisica(fecth, limit)
      var cont = 0
      var fechaActual = new Date()
      for (const record of records) {
        var obj = await ubicacionFisicaModel.where(
          record.TIPO_UBICAC + '_' + record.COD_UBICAC
        )
        if (obj.length == 0) {
          // Añadir los que no existen
          var descripcion = record.UBICAC_FISICA
          var codigo_siga = record.TIPO_UBICAC + '_' + record.COD_UBICAC
          var updated_at = record.FECHA_REG ?? fechaActual
          await ubicacionFisicaModel.insert(
            descripcion,
            codigo_siga,
            updated_at
          )
          cont += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getPersonal(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getPersonal(fecth, limit)
      var cont = 0
      for (const record of records) {
        var obj = await personaNaturalModel.wherePersonal(record.docum_ident)
        if (obj.length > 0) {
          var empleado = await empleadoModel.wherePersonal(
            obj[0].codpersona_natural
          )
          if (empleado.length == 0) {
            var codpersona_natural = obj.codpersona_natural
            await empleadoModel.insertPersonal(codpersona_natural)
            cont += 1
          }
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getTipoPatrimonio(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getTipoPatrimonio(fecth, limit)
      var cont = 0
      var fechaActual = new Date()
      for (const record of records) {
        var obj = await tipoPatrimonioModel.where(
          record.tipo_patrim + '_' + record.clase_patrim
        )
        if (obj.length == 0) {
          var descripcion = record.descripcion
          var codigo_siga = record.tipo_patrim + '_' + record.clase_patrim
          var created_at = record.fecha_reg ?? fechaActual
          var deleted_at = null
          if (record.flag_activo == 'I') {
            var deleted_at = fechaActual
          }
          await tipoPatrimonioModel.insert(
            descripcion,
            codigo_siga,
            created_at,
            deleted_at
          )
          cont += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getMarca(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getMarca(fecth, limit)
      var cont = 0
      var fechaActual = new Date()
      for (const record of records) {
        var obj = await marcaModel.where(record.MARCA)
        if (obj.length == 0) {
          var descripcion = record.descripcion
          var codigo_siga = record.tipo_patrim + '_' + record.clase_patrim
          var created_at = record.fecha_reg ?? fechaActual
          var deleted_at = null
          if (record.ESTADO == 'I') {
            var deleted_at = record.FECHA_BAJA ?? fechaActual
          }
          await marcaModel.insert(
            descripcion,
            codigo_siga,
            created_at,
            deleted_at
          )
          cont += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getGrupo(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getGrupo(fecth, limit)
      var cont = 0
      var fechaActual = new Date()
      for (const record of records) {
        var obj = await grupoModel.where(
          record.tipo_bien + '_' + record.grupo_bien
        )
        if (obj.length == 0) {
          var descripcion = record.nombre_grupo
          var concepto = record.alcance_grupo
          var codigo_siga = record.tipo_bien + '_' + record.grupo_bien
          var created_at = record.fecha_alta ?? fechaActual
          var updated_at = record.fecha_act ?? fechaActual
          var deleted_at = null
          if (record.estado == 'I') {
            var deleted_at = record.fecha_baja ?? fechaActual
          }
          await grupoModel.insert(
            descripcion,
            concepto,
            codigo_siga,
            created_at,
            updated_at,
            deleted_at
          )
          cont += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getClase(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getClase(fecth, limit)
      var cont = 0
      var fechaActual = new Date()
      for (const record of records) {
        var obj = await claseModel.where(
          record.tipo_bien + '_' + record.grupo_bien + '_' + record.clase_bien
        )
        if (obj.length == 0) {
          var codgrupo_bien = null
          var grupo = await grupoModel.where(
            record.tipo_bien + '_' + record.grupo_bien
          )
          if (grupo.length > 0) {
            codgrupo_bien = grupo[0].codgrupo_bien
          }
          var descripcion = record.nombre_clase
          var concepto = record.alcance_clase
          var codigo_siga =
            record.tipo_bien + '_' + record.grupo_bien + '_' + record.clase_bien
          var created_at = record.fecha_reg ?? fechaActual
          var updated_at = record.fecha_act
          var deleted_at = null
          if (record.estado == 'I') {
            var deleted_at = record.fecha_baja ?? fechaActual
          }
          await claseModel.insert(
            codgrupo_bien,
            descripcion,
            concepto,
            codigo_siga,
            created_at,
            updated_at,
            deleted_at
          )
          cont += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getFamilia(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getFamilia(fecth, limit)
      var cont = 0
      var fechaActual = new Date()
      for (const record of records) {
        var obj = await familiaModel.where(
          record.tipo_bien +
            '_' +
            record.grupo_bien +
            '_' +
            record.clase_bien +
            '_' +
            record.familia_bien
        )
        if (obj.length == 0) {
          var codgrupo_bien = null
          var grupo = grupoModel.where(obj.tipo_bien + '_' + obj.grupo_bien)
          if (obj.length > 0) {
            codgrupo_bien = grupo[0].codgrupo_bien
          }
          var codclase_bien = null
          var clase = claseModel.where(
            record.tipo_bien + '_' + record.grupo_bien + '_' + record.clase_bien
          )
          if (obj.length > 0) {
            codclase_bien = clase[0].codclase_bien
          }
          var descripcion = record.nombre_fam
          var concepto = record.alcance_fam
          var codigo_siga =
            record.tipo_bien +
            '_' +
            record.grupo_bien +
            '_' +
            record.clase_bien +
            '_' +
            record.familia_bien
          var created_at = record.fecha_alt ?? fechaActual
          var updated_at = record.fecha_act ?? fechaActual
          var deleted_at = null
          if (record.estado == 'I') {
            var deleted_at = record.fecha_baja ?? fechaActual
          }
          await familiaModel.insert(
            codgrupo_bien,
            codclase_bien,
            descripcion,
            concepto,
            codigo_siga,
            created_at,
            updated_at,
            deleted_at
          )
          cont += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        cont: cont
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getPatrimonio(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getPatrimonio(fecth, limit)
      await mysqlModel.insert('SIG_PATRIMONIO', records)

      res.json({ message: 'Tabla [SIG_PATRIMONIO] actualizada correctamente.' })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Vaciar tablas
  static async truncateTables(req, res) {
    try {
      const tables = [
        'SIG_CENTRO_COSTO',
        'SIG_UBICAC_FISICA',
        'SIG_PERSONAL',
        'SIG_TIPO_PATRIMONIO',
        'MARCA',
        'GRUPO_BIEN_SERV',
        'CLASE_BIEN_SERV',
        'FAMILIA_BIEN_SERV',
        'SIG_PATRIMONIO'
      ]

      for (const table of tables) {
        await mysqlModel.truncate(table)
      }

      res.json({ message: 'Tablas vacias correctamente.' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}
