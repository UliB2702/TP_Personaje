import express, { Router } from "express";
import jwt from "jsonwebtoken";
import PersonajeRouter from "./controllers/personajesController.js";
import PeliculaSerieRouter from "./controllers/peliculaSerieController.js";
import 'dotenv/config';
import passport from "passport";
import { jwtStrategy } from "./common/jwt.strategy.js";

const path = require("path")
const app = express();
const port = 5000;
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger")
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PeliculasPersonajesAPI",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./controllers/*.js")}`],
}
const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  app.get("api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

passport.use(jwtStrategy);
app.use(passport.initialize());
app.use(
  "/api-doc", 
  swaggerUI.serve, 
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
  );
app.use(express.json());
app.use("/api/v1/workouts", v1WorkoutRouter)

export const getRandomString = () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 18; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };

export const getSignedToken = () => {
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


app.use("/characters", PersonajeRouter)
app.use("/movies", PeliculaSerieRouter)

module.exports = { swaggerDocs}


app.listen(port, () => {
    console.log(`Se esta usando el puerto: ${port}`)
    V1SwaggerDocs(app, port);
})
