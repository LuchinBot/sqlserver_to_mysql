import { testModel } from '../models/mysql/test.js'
import { test2Model } from '../models/sqlserver/test.js'
export class CrontabController{
    static async getAll(req, res) {
        try {
            const mysql = await testModel.getAll()
            const sqlserver = await test2Model.getAll()
            //res.json({ mysql, sqlserver })

            // Recorrer datos del sqlserver y pasarlos al mysql
            for (let i = 0; i < sqlserver.length; i++) {
                // insertar en mysql
                const result = await testModel.insert(sqlserver[i])
                console.log(result)
            }
        } catch (error) {
            console.error('Error:', error)
            res.status(500).json({ error: 'Server Error' })
        }
    }
}
