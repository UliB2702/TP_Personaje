import express, { Router } from "express";
import cors from "cors";
import PersonajeRouter from "./src/controllers/personajeController";
import PeliculaSerieRouter from "./src/controllers/peliculaSerieController";
import 'dotenv/config';

const app = express();
const port = 5000;

app.use(express.json());



app.use("/Personaje", PersonajeRouter)
app.use("/PeliculaSerie", PeliculaSerieRouter)




app.listen(port, () => {
    console.log(`Se esta usando el puerto: ${port}`)
})
