import { test2Model } from '../models/sqlserver/test.js'
export class Test2Controller {
  static async getAll(req, res) {
    try {
      const tests = await test2Model.getAll()
      res.json(tests)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}