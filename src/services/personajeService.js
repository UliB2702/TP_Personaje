import Personaje from "../models/Personaje.js";
import sql from 'mssql'
import configDB from "../models/db.js";


export const getByParams = async (nombre,edad,movie) => {
    const conn = await sql.connect(configDB)
    let results = 0
    if(nombre)
    {
        if(edad)
        {
            if(movie)
            {
                results = await conn.request().input("whereCondition", nombre).input("whereCondition2", edad).input("whereCondition3", movie).query(`SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON p.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.IdPeliculaSerie = PeliculaSerie.Id WHERE p.Nombre LIKE '%${nombre}%' AND PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition3 AND p.Edad = @whereCondition2`)
            }
            else{
                results = await conn.request().input("whereCondition", nombre).input("whereCondition2", edad).query(`SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.Nombre LIKE '%${nombre}%' AND Personaje.Edad = @whereCondition2`)
            }
        }
        else{
            if(movie)
            {
                results = await conn.request().input("whereCondition", nombre).input("whereCondition2", movie).query(`SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON p.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.IdPeliculaSerie = PeliculaSerie.Id WHERE PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition2 AND p.Nombre LIKE '%${nombre}%'`)

            }
            else{
                results = await conn.request().input("whereCondition", nombre).query(`SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.Nombre LIKE '%${nombre}%'`)

            }
        }
    }
    else if(edad){
        if(movie)
        {
            results = await conn.request().input("whereCondition", edad).input("whereCondition2", movie).query('SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON p.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.IdPeliculaSerie = PeliculaSerie.Id WHERE PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition2 AND p.Edad = @whereCondition')

        }
        else
        {
            results = await conn.request().input("whereCondition", edad).query('SELECT Id, Imagen, Nombre FROM Personaje WHERE Personaje.Edad = @whereCondition')
        }
    }
    else if(movie)
    {
        results = await conn.request().input("whereCondition", movie).query("SELECT p.Id, p.Imagen, p.Nombre FROM Personaje as p INNER JOIN PersonajeXPeliculaSerie ON p.Id = PersonajeXPeliculaSerie.IdPersonaje INNER JOIN PeliculaSerie ON PersonajeXPeliculaSerie.IdPeliculaSerie = PeliculaSerie.Id WHERE PersonajeXPeliculaSerie.IdPeliculaSerie = @whereCondition")
    }
    else
    {
        results = await conn.request().query('SELECT Id, Imagen, Nombre FROM Personaje')
    }

    console.log(results)
    return results;
}

export const getByID = async (numero) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query("SELECT p.Id, p.Imagen, p.Nombre, p.Edad, p.Peso , p.Historia, STRING_AGG(ps.Titulo + ' (Poster: ' + ps.Imagen + ' Fecha de estreno: ' + Convert(VARCHAR(MAX),ps.FechaCreacion) + ' Calificacion: ' + Convert(VARCHAR(MAX),ps.Calificacion) + ')' , ';') as Peliculas FROM Personaje AS p INNER JOIN PersonajeXPeliculaSerie as pxs ON p.Id = pxs.IdPersonaje INNER JOIN PeliculaSerie AS ps ON pxs.IdPeliculaSerie = ps.Id WHERE p.Id = @whereCondition GROUP BY p.Id, p.Imagen, p.Nombre, p.Edad, p.Peso , p.Historia");
    results.recordset[0].Peliculas = results.recordset[0].Peliculas.split(';')
    console.log(results)
    return results
}

export const getByIDSinUnion = async (numero) => {
    const conn = await sql.connect(configDB);
    const results = await conn.request().input("whereCondition", numero).query('SELECT * FROM Personaje WHERE Personaje.Id = @whereCondition');
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
    await conn.request().input("whereCondition", numero).query('DELETE FROM Personaje WHERE Personaje.Id = @whereCondition'); 
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
    .query('UPDATE Personaje SET Imagen = @pImagen, Nombre = @pNombre, Edad = @pEdad, Peso = @pPeso, Historia = @pHistoria WHERE Personaje.Id LIKE @whereCondition');

}

