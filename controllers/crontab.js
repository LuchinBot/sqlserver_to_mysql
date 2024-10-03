import { testModel } from '../models/mysql/test.js'
import { test2Model } from '../models/sqlserver/test.js'
export class CrontabController {
  static async getAll(req, res) {
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
    }
  }
}
