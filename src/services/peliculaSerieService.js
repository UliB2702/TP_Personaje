import PeliculaSerie from "../models/PeliculaSerie.js";
import Personaje from "../models/Personaje.js";
import sql from 'mssql'
import configDB from "../models/db.js";


export const getByParams = async (nombre, orden) =>{
    const conn = await sql.connect(configDB)
    let results = 0
    if(nombre)
    {
        
        if(orden == "ASC")
        {
            results = await conn.request().input("whereCondition", nombre).query(`SELECT Id, Imagen, Titulo, FechaCreacion FROM PeliculaSerie WHERE PeliculaSerie.Titulo LIKE '%${nombre}%' ORDER BY FechaCreacion ASC`)
        }
        else if(orden == "DESC")
        {
            results = await conn.request().input("whereCondition", nombre).query(`SELECT Id, Imagen, Titulo, FechaCreacion FROM PeliculaSerie WHERE PeliculaSerie.Titulo LIKE '%${nombre}%' ORDER BY FechaCreacion DESC`)
        }
        else
        {
            results = await conn.request().input("whereCondition", nombre).query(`SELECT Id, Imagen, Titulo, FechaCreacion FROM PeliculaSerie WHERE PeliculaSerie.Titulo LIKE '%${nombre}%'`)
        }     
    }
    else
    {
        if(orden == "ASC")
        {
            results = await conn.request().query(`SELECT Id, Imagen, Titulo, FechaCreacion FROM PeliculaSerie ORDER BY FechaCreacion ASC`)
        }
        else if(orden == "DESC")
        {
            results = await conn.request().query(`SELECT Id, Imagen, Titulo, FechaCreacion FROM PeliculaSerie ORDER BY FechaCreacion DESC`)
        }
        else{
            results = await conn.request().query('SELECT Id, Imagen, Titulo, FechaCreacion FROM PeliculaSerie')
        }
    }
    console.log(results)
    return results;
}

export const getByID = async (numero) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query("SELECT ps.Id, ps.Imagen, ps.Titulo, ps.FechaCreacion, ps.Calificacion, STRING_AGG(p.Nombre + ' (Edad: ' + Convert(VARCHAR(MAX),p.Edad) + ' Peso: ' + Convert(VARCHAR(MAX),p.Peso) + ' Imagen: ' + p.Imagen + ' Historia: ' + p.Historia + ')' , ';') AS Personajes FROM PeliculaSerie ps INNER JOIN PersonajeXPeliculaSerie pxp ON ps.Id = pxp.IdPeliculaSerie INNER JOIN Personaje p ON pxp.IdPersonaje = p.Id WHERE ps.Id = @whereCondition GROUP BY ps.Id, ps.Imagen, ps.Titulo, ps.FechaCreacion, ps.Calificacion");
    if(results.recordset[0] != undefined){
    results.recordset[0].Personajes = results.recordset[0].Personajes.split(';')
    }
    console.log(results)
    return results
}

export const getByIDSinUnion = async (numero) => {
    const conn = await sql.connect(configDB);
    console.log(numero)
    const results = await conn.request().input("whereCondition", numero).query('SELECT * FROM PeliculaSerie WHERE PeliculaSerie.Id = @whereCondition');
    console.log(results)
    return results
}

export const create = async (peliculaSerie) =>{
    const conn = await sql.connect(configDB);
    if(peliculaSerie.calificacion>5)
    {
        peliculaSerie.calificacion = 5;
    }
    else if(peliculaSerie.calificacion<1)
    {
        peliculaSerie.calificacion = 1;
    }
    await conn.request()
    .input("pTitulo", peliculaSerie.titulo)
    .input("pImagen", peliculaSerie.imagen)
    .input("pFechaCreacion", peliculaSerie.fechaCreacion)
    .input("pCalificacion", peliculaSerie.calificacion)
    .query('INSERT INTO PeliculaSerie (Imagen, Titulo, FechaCreacion, Calificacion) VALUES (@pImagen, @pTitulo, @pFechaCreacion, @pCalificacion)');

}

export const deleteByID = async(numero) =>{
    const conn = await sql.connect(configDB);
    await conn.request().input("whereCondition", numero).query('DELETE FROM PeliculaSerie WHERE PeliculaSerie.Id LIKE @whereCondition'); 
}

export const update = async (id, peliculaSerie) =>{
    const conn = await sql.connect(configDB);
    if(peliculaSerie.calificacion>5)
    {
        peliculaSerie.calificacion = 5;
    }
    else if(peliculaSerie.calificacion<1)
    {
        peliculaSerie.calificacion = 1;
    }
    await conn.request()
    .input("whereCondition", id)
    .input("pTitulo", peliculaSerie.titulo)
    .input("pImagen", peliculaSerie.imagen)
    .input("pFechaCreacion", peliculaSerie.fechaCreacion)
    .input("pCalificacion", peliculaSerie.calificacion)
    .query('UPDATE PeliculaSerie SET Imagen = @pImagen, Titulo = @pTitulo, FechaCreacion = @pFechaCreacion, Calificacion = @pCalificacion WHERE PeliculaSerie.Id LIKE @whereCondition');
}