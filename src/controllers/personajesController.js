import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { getByParams, getByID } from '../services/personajeService.js';
const controller = Router()

controller.get('/auth/login', async (req, res) => {

});
controller.get('', Authenticate, async (req, res) => {
    const name = req.query.name
    const age = req.query.age
    const movies = req.query.movie

    const personajes = await getByParams(name,age,movies)

    return res.status(200).json(personajes);
});

controller.get('/:id', Authenticate, async (req, res) => {
    const personaje = await getByID(req.params.id);
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
    const id = req.body.id
    const Personaje = await getByID(id);
    await deleteByID(id);
    return res.status(200).json(Personaje)
})

controller.put('/api/', Authenticate, async (req, res) => {
    const id = req.body.id
    const personaje2 = new Personaje()
    personaje2.imagen = req.body.imagen
    personaje2.nombre = req.body.nombre
    personaje2.edad = req.body.edad
    personaje2.peso = req.body.peso
    personaje2.historia = req.body.historia
    await update(id, personaje2)
    const Personaje1 = await getByID(id);

    return res.status(200).json(Personaje1)
})

export default controller;