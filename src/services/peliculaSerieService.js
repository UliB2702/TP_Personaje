import PeliculaSerie from "../models/Personaje.js";
import sql from 'mssql'
import configDB from "../models/db.js";

export const getAll = async () => {
    const conn = await sql.connect(configDB)
    const results = await conn.request().query('SELECT Id, Imagen, Titulo, FechaCreacion FROM PeliculaSerie')
    console.log(results)
    return results;
}

export const getByID = async (numero) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query('SELECT * FROM PeliculaSerie INNER JOIN PersonajeXPeliculaSerie ON PeliculaSerie.Id = PersonajeXPeliculaSerie.IdPeliculaSerie INNER JOIN Personaje ON PersonajeXPeliculaSerie.IdPersonaje = Personaje.Id WHERE PeliculaSerie.Id LIKE @whereCondition');
    console.log(results)
    return results
}

export const create = async (peliculaSerie) =>{
    const conn = await sql.connect(configDB);
    const results = await conn.request()
    .input("pTitulo", peliculaSerie.titulo)
    .input("pImagen", peliculaSerie.imagen)
    .input("pFechaCreacion", peliculaSerie.fechaCreacion)
    .input("pCalificacion", peliculaSerie.calificacion)
    .query('INSERT INTO PeliculaSerie (Imagen, Titulo, FechaCreacion, Calificacion) VALUES (@pImagen, @pTitulo, @pFechaCreacion, @Calificacion)');
    console.log(results)
    return results;
}

export const deleteByID = async(numero) =>{
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query('DELETE FROM PeliculaSerie WHERE PeliculaSerie.Id LIKE @whereCondition'); 
    console.log(results)
    return results
}

export const update = async (id, peliculaSerie) =>{
    const conn = await sql.connect(configDB);
    const results = await conn.request()
    .input("pTitulo", peliculaSerie.titulo)
    .input("pImagen", peliculaSerie.imagen)
    .input("pFechaCreacion", peliculaSerie.fechaCreacion)
    .input("pCalificacion", peliculaSerie.calificacion)
    .query('UPDATE Personaje SET @pImagen = Imagen, Titulo = @pTitulo, FechaCreacion = @pFechaCreacion, Calificacion = @pCalificacion WHERE PeliculaSerie.Id LIKE @whereCondition');
    console.log(results)
    return results;
}