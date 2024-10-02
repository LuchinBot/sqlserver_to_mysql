import { testModel } from '../models/mysql/test.js'
import { test2Model } from '../models/sqlserver/test.js'
export class CrontabController {
  static async getAll(req, res) {
    try {
      // Crear array con las tables
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
        // Obtener los registros de la tabla
        const records = await test2Model.getAll(table)
        // vaciar las tablas del testModel
        await testModel.truncate(table)
        // Insertar los registros en la tabla correspondiente
        await testModel.insert(table, records)
      }

      res.json({ message: 'Crontab actualizado correctamente' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}
