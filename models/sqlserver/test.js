import { sqlserver } from '../../sqlserver.js'
export class test2Model {
    static async getAll() {
        var request = new sqlserver.Request();
        request.query('SELECT * FROM SIG_PATRIMONIO', function (err, result) {
            console.log(result.recordset);
        });
    }

}

