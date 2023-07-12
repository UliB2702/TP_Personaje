# TP-Personajes

## Pasos para utilizarlo
#### 1 Descargar el zip adjunto en el repositorio ⬇️
Podes descargarlo directamente o usar *git clone https://github.com/UlisesBaamonde/TP_Personaje.git* (En ese caso, estara en la carpetas de Usuarios de tu computadora)
#### 2 Abrir y configurar el proyecto ⚙️
Una vez que descargues, tienes que abrirlo en Visual Studio Code, asi teniendo acceso a todo el codigo. No solo eso, si no que tambien tendras que abrir la base de datos, para eso, necesitara algun especializado en SQL Server y, dentro de ahi, tendras que abrir los archivos *PersonajeYPeliculas.sql* y *01 - CreateLoginAndUser.sql* que los encontraras en la carpeta del proyecto y ejecutarlos en el orden nombrados. Por ultimo, dentro del archivo *.env* tendras que modificar el apartado "DB_SERVER" con el nombre de tu computador. 
Si no sabes el nombre de tu computadora, podes buscarlo en la configuración en la sección de "Acerca de"
#### 3 Correr el proyecto ⏯️
Una vez tengas todo configurado, para abrir el proyecto, necesitas poner en la terminal el comando *npm run start:juli*
Si hubo un problema y el proyecto no corrio, entonces puede ser que:
    - NPM no este actualizado, en cuyo caso, escriba "npm install npm@latest -g" para actualizarlo a la ultima version
Cuando en la terminal aparezca el mensaje "Se esta usando el puerto: 5000", significa que el proyecto ya esta corriendo
    Si quieres que corra en otro puerto tienes que:
        - Abrir el archivo *server.js* en la carpeta *src"*
        - Buscar una parte del Codigo llamada *const port*
        - Cambiar el numero 5000 por el que desees utilizar
        - Si, cuando hiciste estos cambios, el proyecto ya estaba corriendo, cerrarlo y volverlo a correr
Una vez el proyecto este corriendo donde tu desees, en el navegador, tienes que escribir como url *http://localhost:5000/api-docs* para abrir Swagger con los diferentes endpoints
 
    
