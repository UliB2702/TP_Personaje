import Personaje from "../models/Personaje.js";
import sql from 'mssql'
import configDB from "../models/db.js";

export const getAll = async () => {
    const conn = await sql.connect(configDB)
    const results = await conn.request().query('SELECT * FROM Personaje')
    console.log(results)
    return results;
}