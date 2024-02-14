const qr = require('qrcode');
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const { log } = require('node:console');

const { comunicationManager } = require('./comunicationManager');

const app = express();
app.use(cors())

const salaAdmin = [];
const taules = [];

/***ALVARO***/

let arrayHardCodedTaules =
[
    {
        socketN: `1/1`,
        restaurant_id: 1,
        numTaula: 1,
        qrCode: `https://localhost:3000/?restaurantId=1&tableId=1`,
        clients: [],
        productes: []
    },
    {
        socketN: `1/2`,
        restaurant_id: 1,
        numTaula: 2,
        qrCode: `https://localhost:3000/?restaurantId=1&tableId=2`,
        clients: [],
        productes: []
    },
    {
        socketN: `2/1`,
        restaurant_id: 2,
        numTaula: 1,
        qrCode: `https://localhost:3000/?restaurantId=2&tableId=1`,
        clients: [],
        productes: []
    },
]

taules.push(...arrayHardCodedTaules);

/******/


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


    socket.on('joinAdmin', (idRest) => {
        const existingSala = salaAdmin.find(s => s.idRest === idRest);
        if (existingSala) {
            console.log("Sala ya creada");
            socket.join(idRest);
            existingSala.users.push(socket.id);
            salaAdmin = salaAdmin.map(sala => {
                if (sala.idRest === idRest) {
                    return {
                        ...sala,
                        users: existingSala.users
                    };
                }
                return sala;
            });
            console.log('Usuario', socket.id, 'se ha unido a la sala', idRest);
        } else {
            const newSala = {
                idRest: idRest, users: [], dades: {}
            };
            dades = ferFetchs(idRest);
            socket.join(idRest);
            newSala.users.push(socket.id);
            salaAdmin.push(newSala);
            console.log('Usuario', socket.id, 'se ha unido a la sala', idRest);
        }
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
        let qrCode = await generateQRCode(`${ruta}/?restaurantId=${idRest}&tableId=${numTaula}`);
        // console.log("Ntaula", JSON.stringify(taula));
        taules.push(taula);
        socket.emit('QRGenerated', qrCode);
        console.log(taules);
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

    /***ALVARO***/

    socket.on('crear-comanda', (cistella) => {

        let index;

        // Fer comprovacions al node

        // Find numTaula dins de l'array taules que es correspongui amb l'ID del tiquet
        for (let i = 0; i < taules.length; i++) {
            if (taules[i].numTaula == cistella.tiquet_id) {
                taules[i].productes.push(...cistella.productes); // Si el troba fa push
                index = i;
            }
        }

        console.log(`PRODUCTES TAULA ${taules[index].socketN}`, taules[index].productes);
        io.emit('crear-comanda', taules[index].productes);
    });

    /******/

    socket.on('getTaules', (idRest) => {
        let filteredTaules = taules.filter(t => t.restaurant_id === idRest);
        socket.emit('taules', filteredTaules);
    });
});

async function ferFetchs(idRest) {
    let categories = await comunicationManager.getCategories(idRest);
    let productesPromises = categories.map(element => comunicationManager.getProductes(element.id));
    let productes = await Promise.all(productesPromises);
    let ingredients = await comunicationManager.getAllIngredients();
    let NsalaAdmin = {
        categories: categories,
        productes: productes,
        ingredients: ingredients,
    }
    return NsalaAdmin;
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

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});