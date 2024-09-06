import { testModel } from '../models/mysql/test.js'
export class TestController {
  static async getAll(req, res) {
    try {
      const tests = await testModel.getAll()
      res.json(tests)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}