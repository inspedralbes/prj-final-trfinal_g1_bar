const qr = require('qrcode');
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const { log } = require('node:console');

const { comunicationManager } = require('./comunicationManager');

const app = express();
app.use(cors())

const salaAdmin = {
    nomSala: 'admin',
    users: [],
};
const taules=[];

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


    //continuar desde aqui
    socket.on('generateQR', async (idRest, numTaula) => {
        let ruta = 'https://localhost:3000';
        let qrCode = await generateQRCode(`${ruta}/${idRest}/${numTaula}`);
        // let fetchs = await ferFetchs(idRest, numTaula, qrCode);
        // console.log("fetchs", JSON.stringify(fetchs));
        // taules.push(fetchs);
        // comunicationManager.postTiquet(fetchs);
        socket.emit('QRGenerated', qrCode);
    });

    socket.on('getTiquet', async (idTiquet) => {
        let tiquet = await comunicationManager.getTiquet(idTiquet);
        console.log("getTiquet" + JSON.stringify(tiquet));
        socket.emit('tiquet', tiquet);
    });

    socket.on('getCategories', async (idRest) => {
        let categories = await comunicationManager.getCategories(idRest);
        console.log("getCategories" + JSON.stringify(categories));
        socket.emit('categories', categories);
    });

    socket.on('getProductes', async (idCat) => {
        let productes = await comunicationManager.getProductes(idCat);
        console.log("getProductes" + JSON.stringify(productes));
        socket.emit('productes', productes);
    });

    socket.on('getIngredients', async (idProd) => {
        let ingredients = await comunicationManager.getIngredients(idProd);
        console.log("getIngredients" + JSON.stringify(ingredients));
        socket.emit('ingredients', ingredients);
    });

    socket.on('getAllIngredients', async () => {
        let ingredients = await comunicationManager.getAllIngredients();
        console.log("getAllIngredients", JSON.stringify(ingredients));
        socket.emit('allIngredients', ingredients);
    });

    // Manejar desconexiones
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });

    socket.on('getTaules', (idRest) => {
        let filteredTaules = taules.filter(t => t.restaurant_id === idRest);
        socket.emit('taules', filteredTaules);
    });
});

async function ferFetchs(idRest, numTaula, qrCode) {
    let categories = await comunicationManager.getCategories(idRest);
    let productesPromises = categories.map(element => comunicationManager.getProductes(element.id));
    let productes = await Promise.all(productesPromises);
    let ingredients = await comunicationManager.getAllIngredients();
    let taulaN = {
        socketN: `${idRest}/${numTaula}`,
        restaurant_id: idRest,
        nombre_taula: numTaula,
        clients:[],
        tiquets: [],
        categories: categories,
        productes: productes,
        ingredients: ingredients,
        qrCode: qrCode
    }
    return taulaN;
}

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