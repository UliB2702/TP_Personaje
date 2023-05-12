import express, { Router } from "express";
import jwt from "jsonwebtoken";
import PersonajeRouter from "./controllers/personajesController.js";
import PeliculaSerieRouter from "./controllers/peliculaSerieController.js";
import 'dotenv/config';
import passport from "passport";
import { jwtStrategy } from "./common/jwt.strategy.js";

const app = express();
const port = 5000;
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use(express.json());

const getRandomString = () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 18; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };

const getSignedToken = () => {
    const userId = getRandomString();
    const userMail = `${userId}@personajes.com`;
    const token = jwt.sign(
        {
            payload: "PersoMovie",
            userEmail: userMail,
        },
        process.env.AUTH_HS256_KEY,
        {
            issuer: process.env.AUTH_ISSUER_URL,
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
