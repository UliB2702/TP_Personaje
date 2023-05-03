import { Router } from 'express';
import PersonajeService from '../../services/personajeService.js';
const controller = Router()
const personajeService = new personajeService();

controller.get('/characters', async (req, res) => {
    const personajes = await PersonajeService.getAll();
    return res.status(200).json(personajes);
});

controller.get('/:id', async (req, res) => {
    const personaje = await PersonajeService.getByID(req.params.id);
    return res.status(200).json(personaje)
})

controller.post('/api/', async (req, res)=> {
    const personaje = new Personaje()

    personaje.imagen = req.body.imagen
    personaje.nombre = req.body.nombre
    personaje.edad = req.body.edad
    personaje.peso = req.body.peso
    personaje.historia = req.body.historia
    await PersonajeService.create(personaje)
    return res.status(201).json(personaje)
})

controller.delete('/api/', async (req, res) => {
    const id = req.body.id
    const Personaje = await PersonajeService.getByID(id);
    await PersonajeService.deleteByID(id);
    return res.status(200).json(Personaje)
})

controller.put('/api/', async (req, res) => {
    const id = req.body.id
    const personaje2 = new Personaje()
    personaje2.imagen = req.body.imagen
    personaje2.nombre = req.body.nombre
    personaje2.edad = req.body.edad
    personaje2.peso = req.body.peso
    personaje2.historia = req.body.historia
    await PersonajeService.update(id, personaje2)
    const Personaje1 = await PersonajeService.getByID(id);

    return res.status(200).json(Personaje1)
})

export default controller;