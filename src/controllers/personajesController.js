import { Router } from 'express';
import PersonajeService from '../../services/personajeService.js';
const controller = Router()
const personajeService = new personajeService();

controller.get('', async (req, res) => {
    const personajes = await PersonajeService.getAll();
    return res.status(200).json(personajes);
});

export default controller;