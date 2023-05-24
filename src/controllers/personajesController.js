import Personaje from "../models/Personaje.js";
import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { getByParams, getByID, getAll, create, deleteByID, update } from '../services/personajeService.js';
const controller = Router()

controller.get('/auth/login', async (req, res) => {

});
//Cuando funcione el otro, borrar este
/*
controller.get('', Authenticate, async (req, res) => {
    const personajes = await getAll();
    return res.status(200).json(personajes);
});*/

controller.get('', Authenticate, async (req, res) => {
    const name = req.query.name
    const age = req.query.age
    const movies = req.query.movie

    const personajes = await getByParams(name,age,movies)

    return res.status(200).json(personajes);
});

controller.get('/:id', Authenticate, async (req, res) => {
    let id = req.params.id
    console.log("Numero con el cual buscar:" + id)
    const personaje = await getByID(id);
    return res.status(200).json(personaje)
})

controller.post('/api/', Authenticate, async (req, res)=> {
    const personaje = new Personaje()

    personaje.imagen = req.body.imagen
    personaje.nombre = req.body.nombre
    personaje.edad = req.body.edad
    personaje.peso = req.body.peso
    personaje.historia = req.body.historia
    await create(personaje)
    return res.status(201).json(personaje)
})

controller.delete('/api/', Authenticate, async (req, res) => {
    let personaje2 = new Personaje()
    const id = req.body.id
    personaje2 = await getByID(id)
    await deleteByID(id);
    return res.status(200).json(personaje2)
})

controller.put('/api/', Authenticate, async (req, res) => {
    const id = req.body.id
    let personaje3 = new Personaje()
    personaje3 = await getByID(id)
    const personaje2 = new Personaje()
    personaje2.imagen = req.body.imagen
    personaje2.nombre = req.body.nombre
    personaje2.edad = req.body.edad
    personaje2.peso = req.body.peso
    personaje2.historia = req.body.historia
    personaje3 = {...personaje3, ...personaje2}
    await update(id, personaje3)
    const Personaje1 = await getByID(id);

    return res.status(200).json(Personaje1)
})

export default controller;