import { sqlserver } from '../../sqlserver.js'
export class test2Model {
    static async getAll() {
        var request = new sqlserver.Request();
        var result = await request.query("SELECT * FROM SIG_PERSONAL");
        return result.recordset
    }

}