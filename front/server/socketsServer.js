const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Manejar conexiones de websockets
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Manejar desconexiones
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// Iniciar el servidor en el puerto 3001 (o el puerto que desees)
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});