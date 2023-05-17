import PeliculaSerie from "../models/PeliculaSerie.js";
import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { getByParams, getByID, getAll, create, deleteByID, update } from '../services/peliculaSerieService.js';

const controller = Router()

controller.get('/auth/login', async (req, res) => {
    
});

controller.get('', Authenticate, async (req, res) => {
    const name = req.query.name
    const order = req.query.order

    const peliculaSerie = await getByParams(name,order)

    return res.status(200).json(peliculaSerie);
});

controller.get('', Authenticate, async (req, res) => {
    const peliculaSerie = await getAll();
    return res.status(200).json(peliculaSerie);
});

controller.get('/:id', Authenticate, async (req, res) => {
    const peliculaSerie = await getByID(req.params.id);
    return res.status(200).json(peliculaSerie)
})

controller.post('/api/', Authenticate, async (req, res)=> {
    const peliculaSerie = new PeliculaSerie()

    peliculaSerie.imagen = req.body.imagen
    peliculaSerie.titulo = req.body.titulo
    peliculaSerie.fechaCreacion = req.body.fechaCreacion
    peliculaSerie.calificacion = req.body.calificacion
    await create(peliculaSerie)
    return res.status(201).json(peliculaSerie)
})

controller.delete('/api/', Authenticate, async (req, res) => {
    const id = req.body.id
    const PeliculaSerie = await getByID(id);
    await deleteByID(id);
    return res.status(200).json(PeliculaSerie)
})

controller.put('/api/', Authenticate, async (req, res) => {
    const id = req.body.id
    const peliculaSerie2 = new PeliculaSerie()
    peliculaSerie2.imagen = req.body.imagen
    peliculaSerie2.titulo = req.body.titulo
    peliculaSerie2.fechaCreacion = req.body.fechaCreacion
    peliculaSerie2.calificacion = req.body.calificacion
    await update(id, personaje2)
    const PeliculaSerie1 = await getByID(id);

    return res.status(200).json(PeliculaSerie1)
})


export default controller;