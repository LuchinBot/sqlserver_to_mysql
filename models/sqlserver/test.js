import { connectSQLServer } from '../../sqlserver.js'
export class test2Model {
    static async getAll() {
        // Hacer una consulta SQL server a la base de datos
        const [tests] = await connectSQLServer.query`SELECT * FROM SIG_PATRIMONIO`
        return tests
    }
}

