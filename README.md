# TP-Personajes

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
- Abrir el archivo *server.js* en la carpeta *src*
- Buscar una parte del código llamada `const port`
- Cambiar el numero 5000 por el que desees utilizar
- Si, cuando hiciste estos cambios, el proyecto ya estaba corriendo, cerrarlo y volverlo a correr
Una vez el proyecto este corriendo donde tu desees, en el navegador, tienes utilizar [este link](http://localhost:5000/api-docs) para abrir Swagger con los diferentes endpoints

#### 4 Conseguir Token
Si seguiste lo pasos correctamente, deberías aparecer en la pantalla de Swagger con todos los endpoints o rutas que podes utilizar para interactuar con la base de datos.
Aunque... **ATENCION!**, aunque, posiblemente te gustaría probarlo de inmediato, si intentas hacer, casi todos no te lo permitirán con lo siguiente `{"message": "Unauthorized"}`. Esto se debe a que necesitas el token para poder utilizar la mayor parte del Swagger. Para obtener este token, tienes que utilizar la ruta `/characters/auth/login` la cual no tienes que estar autorizado para utilizarla y, luego que la pruebes, te va a otorgar el token. Nada más hace falta ponerlo en una casilla llamada **Authorize** que se encuentra arriba del todo y, con eso, podrás utilizar, finalmente, el resto de endpoints
 
    
