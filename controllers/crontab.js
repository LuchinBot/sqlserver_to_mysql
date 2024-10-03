import { testModel } from '../models/mysql/test.js'
import { test2Model } from '../models/sqlserver/test.js'
export class CrontabController {
  static async getAll(req, res) {
    /*
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
      // Recorrer las tablas
      for (const table of tables) {
        const records = await test2Model.getAll(table)
        await testModel.truncate(table)
        await testModel.insert(table, records)
      }

      res.json({ message: 'Crontab actualizado correctamente' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }*/
  }
  static async getCentroCosto(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getCentroCosto(fecth, limit)
      await testModel.insert('SIG_CENTRO_COSTO', records)

      res.json({
        message: 'Tabla [SIG_CENTRO_COSTO] actualizada correctamente.'
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getUbicacionFisica(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getUbicacionFisica(fecth, limit)
      await testModel.insert('SIG_UBICAC_FISICA', records)

      res.json({
        message: 'Tabla [SIG_UBICAC_FISICA] actualizada correctamente.'
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getPersonal(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getPersonal(fecth, limit)
      await testModel.insert('SIG_PERSONAL', records)

      res.json({ message: 'Tabla [SIG_PERSONAL] actualizada correctamente.' })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getTipoPatrimonio(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getTipoPatrimonio(fecth, limit)
      await testModel.insert('SIG_TIPO_PATRIMONIO', records)

      res.json({
        message: 'Tabla [SIG_TIPO_PATRIMONIO] actualizada correctamente.'
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getMarca(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getMarcas(fecth, limit)
      await testModel.insert('MARCA', records)

      res.json({ message: 'Tabla [MARCA] actualizada correctamente.' })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getGrupo(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getGrupos(fecth, limit)
      await testModel.insert('GRUPO_BIEN_SERV', records)

      res.json({
        message: 'Tabla [GRUPO_BIEN_SERV] actualizada correctamente.'
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getClase(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getClases(fecth, limit)
      await testModel.insert('CLASE_BIEN_SERV', records)

      res.json({
        message: 'Tabla [CLASE_BIEN_SERV] actualizada correctamente.'
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getFamilia(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getFamilias(fecth, limit)
      await testModel.insert('FAMILIA_BIEN_SERV', records)

      res.json({
        message: 'Tabla [FAMILIA_BIEN_SERV] actualizada correctamente.'
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  static async getPatrimonio(req, res) {
    try {
      const { fecth, limit } = req.params
      const records = await test2Model.getPatrimonio(fecth, limit)
      await testModel.insert('SIG_PATRIMONIO', records)

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
        await testModel.truncate(table)
      }

      res.json({ message: 'Tablas vacias correctamente.' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}
