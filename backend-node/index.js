const qr = require('qrcode');
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const { log } = require('node:console');

import comunicationManager from './comunicationManager';

const app = express();
app.use(cors())

const salaAdmin = {
    nomSala: 'admin',
    users: [],
};
const taules = [];

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Manejar conexiones de websockets
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);


    socket.on('joinAdmin', () => {
        socket.join(salaAdmin);
        salaAdmin.users.push(socket.id);
        console.log('Usuario', socket.id, 'se ha unido a la sala', salaAdmin.nomSala);
    });

    //crear rooms de sockets
    socket.on('crear-sala', (numTaula, idRest) => {
        // Comprovar si ja existeix una sala amb el mateix nom
        if (taules.find(s => s.socketN === `${idRest}/${numTaula}`)) {
            return;
        }

        // Crear nova sala
        let novaTaula = {
            socketN: `${idRest}/${numTaula}`,
            id: null,
            numTaula: null,
            restaurant: null,
            ocupants: 0,
            clients: [{
                id: null,
                nom: null,
                email: null,
                productes: [{
                    prducteid: null,
                    producteNom: null,
                    preu: null,
                    quantitat: null,
                    comentari: null,
                    estat: null,
                }],
            }],
            qr: null,
        }
        taules.push(novaTaula);
        io.emit('sala-creada', novaTaula);
    });

    socket.on('joinRoom', (room) => {
        let jroom = taules.find(t => t.socketN === room);
        socket.join(jroom.socketN);
        console.log('Usuario', socket.id, 'se ha unido a la sala', room);
    });

    socket.on('leaveRoom', (room) => {
        let lroom = taules.find(t => t.socketN === room);
        socket.leave(lroom.socketN);
        console.log('Usuario', socket.id, 'ha abandonado la sala', room);
    });

    socket.on('generateQR', async (idRest, numTaula) => {
        let ruta = 'https://localhost:3000';
        const qrCode = await generateQRCode(`${ruta}/${idRest}/${numTaula}`);
        socket.emit('QRGenerated', qrCode);
    });

    socket.on('getTiquet', async (idTiquet) => {
        let tiquet = await comunicationManager.getTiquet(idTiquet);
        socket.emit('tiquet', tiquet);
    });

    socket.on('getCategories', async (idRest) => {
        let categories = await comunicationManager.getCategories(idRest);
        socket.emit('categories', categories);
    });

    socket.on('getProductes', async (idCat) => {
        let productes = await comunicationManager.getProductes(idCat);
        socket.emit('productes', productes);
    });

    socket.on('getIngredients', async (idProd) => {
        let ingredients = await comunicationManager.getIngredients(idProd);
        socket.emit('ingredients', ingredients);
    });

    socket.on('getAllIngredients', async () => {
        let ingredients = await comunicationManager.getAllIngredients();
        socket.emit('allIngredients', ingredients);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

async function generateQRCode(text) {
    try {
        const qrCodeDataURL = await qr.toDataURL(text);
        return qrCodeDataURL;
    } catch (error) {
        console.error('Error al generar el código QR:', error);
        throw error;
    }
}

// Iniciar el servidor en el puerto 3001 (o el puerto que desees)
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});