import { Router } from 'express';
import PeliculaSerieService from '../../services/personajeSerieService.js';
const controller = Router()
const peliculaSerieService = new peliculaSerieService();

controller.get('', async (req, res) => {
    const peliculaSerie = await PeliculaSerieService.getAll();
    return res.status(200).json(peliculaSerie);
});

export default controller;