import { connection } from '../../database.js'
export class testModel {
    static async getAll() {
        const [tests] = await connection.query('SELECT * FROM empleado;')
        return tests
    }
}

