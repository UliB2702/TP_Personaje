import express, { Router } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import PersonajeRouter from "./src/controllers/personajeController";
import PeliculaSerieRouter from "./src/controllers/peliculaSerieController";
import 'dotenv/config';
import passport from "passport";

const app = express();
const port = 5000;
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());


const getSignedToken = () => {
    const userId = getRandomString();
    const userMail = `${userId}@personajes.com`;
    const token = jwt.sign(
        {
            payload: "PersoMovie",
            userEmail: userMail,
        },
        process.env.AUTH0_HS256_KEY,
        {
            issuer: "hhtp://personaje.ort/",
            subject: userId,
            audience: ["http://localhost/"],
            expiresIn: 60 * 60 * 24 * 5
        }
    );

    return token;
};

console.log(getSignedToken());

app.use("/characters", PersonajeRouter)
app.use("/movies", PeliculaSerieRouter)




app.listen(port, () => {
    console.log(`Se esta usando el puerto: ${port}`)
})
