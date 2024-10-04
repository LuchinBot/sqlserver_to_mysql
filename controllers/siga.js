import { sigaModel } from '../models/sqlserver/siga.js'
export class SigaController {
  static async getAll(req, res) {
    try {
      const tests = await sigaModel.getAll()
      res.json(tests)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}
