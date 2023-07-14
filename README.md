# TP-Personajes

> ESP
## Pasos para utilizarlo 

#### 1 Descargar el zip adjunto en el repositorio ⬇️
Podes descargarlo directamente o usar `git clone https://github.com/UlisesBaamonde/TP_Personaje.git` (En ese caso, estará en la carpeta de Usuarios de tu computadora, en la que corresponda con el usuario actual que estas utilizando)
#### 2 Abrir y configurar el proyecto ⚙️
Una vez que lo descargues, tienes que abrirlo en Visual Studio Code, para, de esa forma, tener acceso a todo el código. No solo eso, si no que también tendrás que abrir la base de datos, para eso, necesitara algún especializado en SQL Server y, dentro de ahí, tendrás que abrir los archivos *PersonajeYPeliculas.sql* y *01 - CreateLoginAndUser.sql* que los encontraras en la carpeta del proyecto y ejecutarlos en el orden nombrados. Por último, dentro del archivo *.env* tendrás que modificar el apartado `DB_SERVER` con el nombre de tu computador. 
Si no sabes el nombre de tu computadora, podes buscarlo en la configuración en la sección de "Acerca de"
#### 3 Correr el proyecto ⏯️
Una vez tengas todo configurado, para abrir el proyecto, necesitas poner en la terminal el comando `npm run start:juli`
Si hubo un problema y el proyecto no corrió, entonces puede ser que:

- NPM no este actualizado, en cuyo caso, escriba `npm install npm@latest -g` para actualizarlo a la última versión

Cuando en la terminal aparezca el mensaje `Se está usando el puerto: 5000`, significa que el proyecto ya está corriendo
Si quieres que corra en otro puerto tienes que:
1. Abrir el archivo *server.js* en la carpeta *src*
2. Buscar una parte del código llamada `const port`
3. Cambiar el numero 5000 por el que desees utilizar

Si, cuando hiciste estos cambios, el proyecto ya estaba corriendo, cerrarlo y volverlo a correr
Una vez el proyecto este corriendo donde tu desees, en el navegador, tienes utilizar [este link](http://localhost:5000/api-docs) para abrir Swagger con los diferentes endpoints

#### 4 Conseguir Token 🔐
Si seguiste lo pasos correctamente, deberías aparecer en la pantalla de Swagger con todos los endpoints o rutas que podes utilizar para interactuar con la base de datos.

Aunque... **CUIDADO!**, aunque, posiblemente te gustaría probarlo de inmediato, si intentas hacer, casi todos no te lo permitirán con lo siguiente `{"message": "Unauthorized"}`. Esto se debe a que necesitas el token para poder utilizar la mayor parte del Swagger. Para obtener este token, tienes que utilizar la ruta `/characters/auth/login` la cual no tienes que estar autorizado para utilizarla y, luego que la pruebes, te va a otorgar el token. Nada más hace falta ponerlo en una casilla llamada **Authorize** que se encuentra arriba del todo y, con eso, podrás utilizar, finalmente, el resto de endpoints
 
#### 5 Utilizar el Swagger    
En la pantalla del Swagger, apareceran los diferentes endpoints dividos en 2: `/characters` y `/movies` que hacen referencia a las clases de Personajes y PeliculaSerie respectivamente. A continuación te explico cada endpoint:

##### /characters
- `/characters/auth/login`: Te permite obtener el token necesario para realizar la autentificacion
- `/characters` (get): Mediante este endpoint, podes conseguir el ID, Nombre y Imagen de un personaje de la Api con los siguientes parametros
- `/characters` (post): Con este endpoint podes crear personajes para agregar a la Base de Datos
- `/characters` (put): Con este endpoint se puede actualizar los datos de un personaje ya existente en la base de datos. Necesitaras indicar, primero, el ID del personaje que quieras remplazar y, luego, que nuevos valores les quieres dar 
- `/characters/{id}` (get): Con este endpoint podes buscar toda la informacion de un personaje usando su Id
- `/characters/{id}` (delete): Con este endpoint podes borrar un personaje usando su ID
##### /movies
- `/movies` (get): Este endpoint te permite buscar el ID, Nombre y Imagen de una pelicula/serie mediante su nombre y luego te permite ordenarlos segun su fecha de creacion
- `/movies` (post): Con este endpoint podes crear peliculas/series para agregar a la Base de Datos
- `/movies` (put): Con este endpoint se puede actualizar los datos de una pelicula/serie ya existente en la base de datos. Necesitaras indicar, primero, el ID de la pelicula que quieras remplazar y, luego, que nuevos valores les quieres dar
- `/movies/{id}` (get): Con este endpoint podes buscar toda la informacion de una pelicula/serie usando su Id
- `/movies/{id}` (delete): Con este endpoint podes borrar una pelicula/serie usando su ID

Además, al fondo del todo, encontraras los Esquemas que muestran el diseño de los diferentes tipos de clases de objetos utilizados en el Swagger: Personaje, PeliculaSerie, Token y uno mas llamado PersonajeXPelicula que se encarga de unir las dos primeras objetos

> ENG
## Steps to use it

#### 1 Download the attached zip to the repository ⬇️
You can download it directly or use 'git clone https://github.com/UlisesBaamonde/TP_Personaje.git' (In that case, it will be in the Users folder of your computer, in which it corresponds to the current user you are using)
#### 2 Open and configure the project ⚙️
Once you download it, you need to open it in Visual Studio Code, so you have access to all the code. Not only that, but you will also have to open the database, for that, you will need someone specialized in SQL Server and, within there, you will have to open the files *PersonajeYPeliculas.sql* and *01 - CreateLoginAndUser.sql* that you will find in the project folder and run them in the order named. Finally, within the *.env* file you will have to modify the 'DB_SERVER' section with the name of your computer. 
If you don't know the name of your computer, you can look for it in the settings in the "About" section.
#### 3 Run the project ⏯️
Once you have everything configured, to open the project, you need to put in the terminal the command 'npm run start:juli'
If there was a problem and the project did not run, then it may be that:

- NPM is not updated, in which case, type 'npm install npm@latest -g' to update it to the latest version

When the message 'Se está usando el puerto: 5000' appears in the terminal, it means that the project is already running
If you want it to run on another port you have to:
1. Open the *server.js* file in the *src* folder
2. Find a part of the code called 'const port'
3. Change the number 5000 to the one you want to use

If, when you made these changes, the project was already running, close it and run it again
Once the project is running where you want, in the browser, you have to use [this link](http://localhost:5000/api-docs) to open Swagger with the different endpoints

#### 4 Get Token 🔐
If you followed the steps correctly, you should appear on the Swagger screen with all the endpoints or routes you can use to interact with the database.

Although... **BECAREFUL!**, although, possibly you would like to try it right away, if you try to do it, almost everyone will not allow it with the following '{"message": "Unauthorized"}'. This is because you need the token to be able to use most of the Swagger.  To get this token, you have to use the path '/characters/auth/login' which you do not have to be authorized to use and, after you try it, it will grant you the token. You just need to put it in a box called **Authorize** that is at the top and, with that, you can finally use the rest of the endpoints

#### 5 Using the Swagger   
On the screen of the Swagger, the different endpoints will appear divided into 2: '/characters' and '/movies' that refer to the classes of Characters and MovieSeries respectively. Here I explain each endpoint:

##### /characters
- `/characters/auth/login`: Allows you to obtain the token needed to perform authentication
- `/characters` (get): Through this endpoint, you can get the ID, Name and Image of an API character with the following parameters
- `/characters` (post): With this endpoint you can create characters to add to the Database
- `/characters` (put): With this endpoint you can update the data of an existing character in the database. You will need to indicate, first, the ID of the character you want to replace and, then, what new values you want to give them. 
- `/characters/{id}` (get): With this endpoint you can search for all the information of a character using its Id
- `/characters/{id}` (delete): With this endpoint you can delete a character using its ID
##### /movies
- `/movies` (get): This endpoint allows you to search for the ID, Name and Image of a movie/series by its name and then allows you to sort them according to their creation date.
- `/movies` (post): With this endpoint you can create movies/series to add to the Database
- `/movies` (put): With this endpoint you can update the data of a movie/series already in the database. You will need to indicate, first, the ID of the movie you want to replace and, then, what new values you want to give them
- `/movies/{id}` (get): With this endpoint you can search for all the information of a movie/series using its Id
- `/movies/{id}` (delete): With this endpoint you can delete a movie/series using its ID

In addition, at the bottom of the whole, you will find the Schemes that show the design of the different types of object classes used in the Swagger: Character, MovieSeries, Token and one more called CharacterXMovie that is responsible for joining the first two objects
