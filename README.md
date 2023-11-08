# Lab 7 - Computación física

Práctica de lab para la materia de Computación Física que busca emplear base de datos para registrar los datos de un sensor por medio de una placa electrónica, siendo en este caso la ESP32.

Se construyó el proyecto usando React, Express, MySQL y Socket.IO.

Elaborado por:

-   Andrés Felipe Aristizabal Miranda - 2205296
-   Hector Fabio Romero Bocanegra - 2205024

# Replicar código

1. Ejecutar el script de SQL ubicado en `arduino/database.sql`.
2. Ubicarse en la carpeta `backend`, ejecutar el comando `npm i` desde la terminal. Se deben configurar las variables de entorno del archivo `.env` para el correcto funcionamiento y luego escribir el comando `npm run dev`.
3. Ubicarse en la carpeta `frontend`, ejecutar el comando `npm i` desde la terminal. Se deben configurar las variables de entorno del archivo `.env` para el correcto funcionamiento y luego escribir el comando `npm run dev`.
4. Compilar código de arduino en la placa electrónica ubicado en `arduino/lab7/lab7.ino`.
5. Presionar el botón del montaje físico para enviar los datos al backend.
6. Visualizar en tiempo real cómo se agregan los registros a la BD.

Link de la simulación sin Wifi: [TinkerCad](https://www.tinkercad.com/things/4IiUlkDJXRS-lab-7/editel?sharecode=T2p1n8Z0sK4aICtIzAQKOnAbZ6oBtCkgAVybwplvX9A)
