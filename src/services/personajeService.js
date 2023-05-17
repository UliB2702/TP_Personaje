import Personaje from "../models/Personaje.js";
import sql from 'mssql'
import configDB from "../models/db.js";

export const getAll = async () => {
    const conn = await sql.connect(configDB)
    const results = await conn.request().query('SELECT Id, Imagen, Nombre FROM Personaje')
    console.log(results)
    return results;
}

export const getByParams = async (nombre,edad,movie) => {
    const conn = await sql.connect(configDB)
    let results = 0
    if(edad==undefined && movie==undefined)
    {
        results = await conn.request().input("whereCondition", nombre).query(`SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.Nombre LIKE '%${nombre}%'`)
    }
    else if(nombre==undefined && movie==undefined){
        results = await conn.request().input("whereCondition", edad).query('SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.Edad = @whereCondition')
    }
    else if(nombre==undefined && edad==undefined)
    {
        results = await conn.request().input("whereCondition", movie).query("SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON p.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.IdPeliculaSerie = PeliculaSerie.Id WHERE PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition")
    }
    else if(movie==undefined)
    {
        results = await conn.request().input("whereCondition", nombre).input("whereCondition2", edad).query(`SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.Nombre LIKE '%${nombre}%' AND Personaje.Edad = @whereCondition2`)
    }
    else if(edad==undefined)
    {
        results = await conn.request().input("whereCondition", nombre).input("whereCondition2", movie).query(`SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON Personaje.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.PeliculaSerie = PeliculaSerie.Id WHERE PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition2 AND Personaje.Nombre LIKE '%${nombre}%'`)
    }
    else if(nombre==undefined)
    {
        results = await conn.request().input("whereCondition", edad).input("whereCondition2", movie).query('SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON p.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.PeliculaSerie = PeliculaSerie.Id WHERE PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition2 AND p.Edad = @whereCondition')
    }
    else if(nombre==undefined && edad==undefined && movie==undefined)
    {
        results = await conn.request().query('SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p')
    }
    else{
        results = await conn.request().input("whereCondition", nombre).input("whereCondition2", edad).input("whereCondition3", movie).query(`SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON p.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.PeliculaSerie = PeliculaSerie.Id WHERE p.Nombre LIKE '%${nombre}%' AND PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition3 AND p.Edad = @whereCondition2`)
    }
    console.log(results)
    return results;
}

export const getByID = async (numero) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query('SELECT * FROM Personaje INNER JOIN PersonajeXPeliculaSerie ON Personaje.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.PeliculaSerie = PeliculaSerie.Id WHERE Personaje.Id = @whereCondition');
    console.log(results)
    return results
}

export const create = async (personaje) =>{
    const conn = await sql.connect(configDB);
    await conn.request()
    .input("pNombre", personaje.nombre)
    .input("pImagen", personaje.imagen)
    .input("pEdad", personaje.edad)
    .input("pPeso", personaje.peso)
    .input("pHistoria", personaje.historia)
    .query('INSERT INTO Personaje (Imagen, Nombre, Edad, Peso, Historia) VALUES (@pImagen, @pNombre, @pEdad, @pPeso, @pHistoria)');
} 

export const deleteByID = async(numero) =>{
    const conn = await sql.connect(configDB);
    await conn.request().input("whereCondition", numero).query('DELETE FROM Personsaje WHERE Personaje.Id LIKE @whereCondition'); 

}

export const update = async (id, personaje) =>{
    const conn = await sql.connect(configDB);
    await conn.request()
    .input("whereCondition", id)
    .input("pNombre", personaje.nombre)
    .input("pImagen", personaje.imagen)
    .input("pEdad", personaje.edad)
    .input("pPeso", personaje.peso)
    .input("pHistoria", personaje.historia)
    .query('UPDATE Personaje SET Imagen = @pImagen, Nombre = @pNombre, Edad = @pEdad, Peso = @pPeso, Historia =  @pHistoria WHERE Personaje.Id LIKE @whereCondition');

}

