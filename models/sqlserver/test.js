import { sqlserver } from '../../sqlserver.js'
export class test2Model {
  static async getAll(table) {
    var request = new sqlserver.Request()
    var result = await request.query('SELECT * FROM ' + table)
    return result.recordset
  }
}
