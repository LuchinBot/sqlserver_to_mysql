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
import { catalogoModel } from '../models/mysql/catalogo.js'
import { asignacionesModel } from '../models/mysql/asignaciones.js'
import { estadoBienModel } from '../models/mysql/estado_bien.js'
import _ from 'lodash'
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
          var grupo = grupoModel.where(
            record.tipo_bien + '_' + record.grupo_bien
          )
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

  static async getCatalogo(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await sigaModel.getCatalogo(fecth, limit)
      var cont1 = 0
      var cont2 = 0
      for (const record of records) {
        var obj = await catalogoModel.where(
          record.TIPO_BIEN +
            '_' +
            record.GRUPO_BIEN +
            '_' +
            record.CLASE_BIEN +
            '_' +
            record.FAMILIA_BIEN +
            '_' +
            record.ITEM_BIEN
        )
        if (obj.length == 0) {
          var codgrupo_bien = null
          var grupo = grupoModel.where(
            record.TIPO_BIEN + '_' + record.GRUPO_BIEN
          )
          if (grupo.length > 0) {
            codgrupo_bien = grupo[0].codgrupo_bien
          }
          var codclase_bien = null
          var clase = claseModel.where(
            record.TIPO_BIEN + '_' + record.GRUPO_BIEN + '_' + record.CLASE_BIEN
          )
          if (clase.length > 0) {
            codclase_bien = clase[0].codclase_bien
          }
          var codfamilia_bien = null
          var familia = familiaModel.where(
            record.TIPO_BIEN +
              '_' +
              record.GRUPO_BIEN +
              '_' +
              record.CLASE_BIEN +
              '_' +
              record.FAMILIA_BIEN
          )
          if (familia.length > 0) {
            codfamilia_bien = familia[0].codfamilia_bien
          }
          var item_bien = record.ITEM_BIEN
          var nombre = record.NOMBRE_ITEM
          var codigo_siga =
            record.TIPO_BIEN +
            '_' +
            record.GRUPO_BIEN +
            '_' +
            record.CLASE_BIEN +
            '_' +
            record.FAMILIA_BIEN +
            '_' +
            record.ITEM_BIEN
          var created_at = record.FECHA_ALTA ?? null
          var updated_at = record.FECHA_ACT
          var deleted_at = null
          if (record.estado == 'I') {
            var deleted_at = record.FECHA_INACTIVACION ?? null
          }
          await catalogoModel.insert(
            codgrupo_bien,
            codclase_bien,
            codfamilia_bien,
            item_bien,
            nombre,
            codigo_siga,
            created_at,
            updated_at,
            deleted_at
          )
          cont1 += 1
        } else {
          var updated_at = record.FECHA_ACT
          var deleted_at = null
          if (obj.ESTADO == 'I') {
            deleted_at = record.FECHA_INACTIVACION ?? null
          }
          await catalogoModel.update(updated_at, deleted_at)
          cont2 += 1
        }
      }
      res.json({
        message: 'Actualizado correctamente.',
        insert: cont1,
        update: cont2
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }
  static async getAsignar(req, res) {
    try {
      const { fecth, limit, dni } = req.params
      var empleados = []
      var empleado = []

      // Obtener empleados
      if (dni != '0') {
        empleado = await empleadoModel.whereAsigDni(dni)
      } else {
        empleado = await empleadoModel.whereAsig()
      }

      empleados.push(...empleado)

      // Consultar los patrimonios asignados
      var sigaAsignados = await sigaModel.getPatrimonio(fecth, limit, empleados)
      var empleado_array_error = []
      var contador = 0

      for (const dni in sigaAsignados) {
        if (sigaAsignados.hasOwnProperty(dni)) {
          var codgrupo_bien = null
          var codclase_bien = null
          var codfamilia_bien = null
          var codmarca_bien = null
          var codcatalogo_bien = null
          var codempleado = null
          var coddependencia = null
          var codubicacion_fisica = null
          var codtipo_patrimonio = null
          var codestado_conservacion = null
          var nro_doc_empleado = dni

          var empleado_collect = _.filter(empleado, {
            numero_documento_identidad: nro_doc_empleado
          })

          if (empleado_collect.length != 0) {
            codempleado = empleado_collect[0].codempleado
          }

          if (codempleado != null) {
            for (const element of sigaAsignados[dni]) {
              // Cambiado a for...of
              // Defino variables
              var search_grupo_bien = false
              var search_clase_bien = false
              var search_familia_bien = false
              var search_catalogo_bien = false

              // Consulto la marca del bien
              var marca = await marcaModel.where(element.MARCA) // Usar await
              if (marca.length > 0) {
                codmarca_bien = marca[0].codmarca_bien
              }

              // Consulto el estado del bien
              var estado = await estadoBienModel.where(
                element.ESTADO_CONSERV_FIN
              ) // Usar await
              if (estado.length > 0) {
                codestado_conservacion = estado[0].codestado_conservacion
              }

              // Consulto la dependencia
              var dependencia = await dependenciaModel.where(
                element.NOMBRE_DEPEND
              ) // Usar await
              if (dependencia.length > 0) {
                coddependencia = dependencia[0].coddependencia
              }

              // Consulto la ubicación
              var ubicacion = await ubicacionFisicaModel.where(
                element.TIPO_UBICAC + '_' + element.COD_UBICAC
              ) // Usar await
              if (ubicacion.length > 0) {
                codubicacion_fisica = ubicacion[0].codubicacion_fisica
              }

              // Consulto el tipo de patrimonio
              var tipo_patrimonio = await tipoPatrimonioModel.where(
                element.TIPO_PATRIM + '_' + element.CLASE_PATRIM
              ) // Usar await
              if (tipo_patrimonio.length > 0) {
                codtipo_patrimonio = tipo_patrimonio[0].codtipo_patrimonio
              }

              // Consultar asignaciones del bien
              console.log(element.CODIGO_ACTIVO)
              var asig = await asignacionesModel.where(element.CODIGO_ACTIVO) // Usar await
              if (asig.length <= 0) {
                // Lógica para insertar si no existe
                var anio_asignacion = element.ANO_EJE
                var item_bien = element.ITEM_BIEN
                var codigo_patrimonial = element.CODIGO_ACTIVO
                var codigo_siga =
                  element.SEC_EJEC +
                  '_' +
                  element.TIPO_MODALIDAD +
                  '_' +
                  element.SECUENCIA
                var imagen_referencial = null
                var created_at = element.FECHA_ACT ?? null

                // Asignaciones
                await asignacionesModel.upsert(
                  anio_asignacion,
                  item_bien,
                  codigo_patrimonial,
                  codigo_siga,
                  imagen_referencial,
                  created_at,
                  element.OBSERVACIONES,
                  element.CARACTERISTICAS,
                  element.MEDIDAS,
                  element.NRO_SERIE,
                  codestado_conservacion,
                  codtipo_patrimonio,
                  codgrupo_bien,
                  codclase_bien,
                  codfamilia_bien,
                  codcatalogo_bien,
                  codmarca_bien,
                  coddependencia,
                  codubicacion_fisica,
                  codempleado,
                  element.DESCRIPCION,
                  element.MODELO,
                  element.MODELO,
                  codmarca_bien,
                  element.DESCRIPCION,
                  null
                )
                contador++
              } else {
                // Lógica para manejar si ya existe
                console.log(asig[0].codgrupo_bien)
                // Aquí puedes agregar más lógica si es necesario
              }
            }
          } else {
            if (!empleado_array_error.includes(nro_doc_empleado)) {
              empleado_array_error.push(nro_doc_empleado)
            }
          }
        }
      }

      const msg = 'Se insertaron ' + contador + ' registros'
      res.json({
        Message: msg,
        Exception: empleado_array_error
      })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({
        Message: 'Error al procesar la solicitud',
        Exception: error.message
      })
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
