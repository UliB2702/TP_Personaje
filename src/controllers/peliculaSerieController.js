import PeliculaSerie from "../models/PeliculaSerie.js";
import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { getSignedToken, getRandomString} from '../server.js'
import { getByParams, getByID, create, deleteByID, update, getByIDSinUnion } from '../services/peliculaSerieService.js';

const controller = Router()

controller.get('/auth/login', async (req, res) => {
    return res.status(200).json(getSignedToken());
});

 controller.get('', Authenticate, async (req, res) => {
    const name = req.query.name
    const order = req.query.order

    const peliculaSerie = await getByParams(name,order)

    return res.status(200).json(peliculaSerie);
}); 


controller.get('/:id', Authenticate, async (req, res) => {
    console.log(req.params.id)
    const peliculaSerie = await getByID(req.params.id);
    return res.status(200).json(peliculaSerie)
})

controller.post('', Authenticate, async (req, res)=> {
    const peliculaSerie = new PeliculaSerie()
    if(req.body.calificacion>5 || req.body.calificacion<1 )
    {
    return res.status(400)
    }
    else{
    peliculaSerie.imagen = req.body.imagen
    peliculaSerie.titulo = req.body.titulo
    peliculaSerie.fechaCreacion = req.body.fechaCreacion
    peliculaSerie.calificacion = req.body.calificacion
    await create(peliculaSerie)
    return res.status(201).json(peliculaSerie)
    }
})

controller.delete('', Authenticate, async (req, res) => {
    let peliculaSerie2 = new PeliculaSerie()
    const id = req.body.id
    peliculaSerie2 = await getByIDSinUnion(id);
    console.log(peliculaSerie2)
    await deleteByID(id);
    return res.status(200).json(peliculaSerie2)
})

controller.put('', Authenticate, async (req, res) => {
    const id = req.body.id
    let peliculaSerie3 = new PeliculaSerie()
    peliculaSerie3 = await getByID(id)
    const peliculaSerie2 = new PeliculaSerie()
    peliculaSerie2.imagen = req.body.imagen
    peliculaSerie2.titulo = req.body.titulo
    peliculaSerie2.fechaCreacion = req.body.fechaCreacion
    peliculaSerie2.calificacion = req.body.calificacion
    peliculaSerie3 = {...peliculaSerie3, ...peliculaSerie2}
    await update(id, peliculaSerie3)
    return res.status(200).json(peliculaSerie3)
})


export default controller;