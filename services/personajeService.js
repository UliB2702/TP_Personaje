import Personaje from "../models/Personaje.js";
import sql from 'mssql'
import configDB from "../models/db.js";

export const getAll = async () => {
    const conn = await sql.connect(configDB)
    const results = await conn.request().query('SELECT Id, Imagen, Nombre FROM Personaje')
    console.log(results)
    return results;
}

export const getByName = async (nombre) => {
    const conn = await sql.connect(configDB)
    const results = await conn.request().input("whereCondition", nombre).query('SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.Nombre LIKE @whereCondition')
    console.log(results)
    return results;
}

export const getByAge = async (año) => {
    const conn = await sql.connect(configDB)
    const results = await conn.request().input("whereCondition", año).query('SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.FechaCreacion LIKE @whereCondition')
    console.log(results)
    return results;
}

export const getByIdMovie= async (id) => {
    const conn = await sql.connect(configDB)
    const results = await conn.request().input("whereCondition", id).query('SELECT Id, Imagen, Nombre FROM Personaje INNER JOIN PersonajeXPeliculaSerie ON Personaje.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.PeliculaSerie = PeliculaSerie.Id WHERE PersonajeXPeliculaSerie.IdPeliculaSerie LIKE @whereCondition')
    console.log(results)
    return results;
}

export const getByID = async (numero) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query('SELECT * FROM Personaje INNER JOIN PersonajeXPeliculaSerie ON Personaje.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.PeliculaSerie = PeliculaSerie.Id WHERE Personaje.Id LIKE @whereCondition');
    console.log(results)
    return results
}

export const create = async (personaje) =>{
    const conn = await sql.connect(configDB);
    const results = await conn.request()
    .input("pNombre", personaje.nombre)
    .input("pImagen", personaje.imagen)
    .input("pEdad", personaje.edad)
    .input("pPeso", personaje.peso)
    .input("pHistoria", personaje.historia)
    .query('INSERT INTO Personaje (Imagen, Nombre, Edad, Peso, Historia) VALUES (@pImagen, @pNombre, @pEdad, @pPeso, @pHistoria)');
    console.log(results)
    return results;
} 

export const deleteByID = async(numero) =>{
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query('DELETE FROM Personsaje WHERE Personaje.Id LIKE @whereCondition'); 
    console.log(results)
    return results
}

export const update = async (id, personaje) =>{
    const conn = await sql.connect(configDB);
    const results = await conn.request()
    .input("pNombre", personaje.nombre)
    .input("pImagen", personaje.imagen)
    .input("pEdad", personaje.edad)
    .input("pPeso", personaje.peso)
    .input("pHistoria", personaje.historia)
    .query('UPDATE Personaje SET Imagen = @pImagen, Nombre = @pNombre, Edad = @pEdad, Peso = @pPeso, Historia =  @pHistoria WHERE Personaje.Id LIKE @whereCondition');
    console.log(results)
    return results;
}