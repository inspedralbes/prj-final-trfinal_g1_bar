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
const restaurants = [];
const socketRooms = {};

/***ALVARO***/

let arrayHardCodedTaules =
[
    {
        id: '1-1',
        restaurant_id: 1,
        numTaula: 1,
        qrCode: `https://localhost:3000/?restaurantId=1&tableId=1`,
        clients: [],
        productes: []
    },
    {
        id: '1-2',
        restaurant_id: 1,
        numTaula: 2,
        qrCode: `https://localhost:3000/?restaurantId=1&tableId=2`,
        clients: [],
        productes: []
    },
    {
        id: '2-1',
        restaurant_id: 2,
        numTaula: 1,
        qrCode: `https://localhost:3000/?restaurantId=2&tableId=1`,
        clients: [],
        productes: []
    },
]

taules.push(...arrayHardCodedTaules);
let comptadorIdProducte = 1;

/******/

// Fer fetchs de dades dels restaurants automaticament
(async function() {
    for (let i = 1; i <= 2; i++) {
        let dades = await ferFetchs(i);
        restaurants.push({ idRest: i, dades: dades });
    }

    console.log("RESTAURANTS", restaurants);

    // Enviar dades dels restaurants a les sales corresponents
    for (let i = 1; i <= 2; i++) {
        io.to(i).emit('restaurants', restaurants[i]);
    }
})()


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

    socket.on('disconnect', () => {
        let idSala = socketRooms[socket.id];
        if (idSala) {
            socket.leave(idSala);
            delete socketRooms[socket.id];
            console.log('Usuario', socket.id, 'ha abandonado la sala', idSala);
        }
    })

    socket.on('joinRoom', (id) => {
        let taula = taules.find(t => t.id === id);
        if(!taula) return;

        // Si el socket ja estava a una sala, l'abandonem
        if(socketRooms[socket.id]) {
            socket.leave(socketRooms[socket.id]);
            console.log('Usuario', socket.id, 'ha abandonado la sala', socketRooms[socket.id]);
        }

        // Afegim el socket a la sala
        socket.join(id);
        socketRooms[socket.id] = id;

        // Enviem les dades del restaurant al client
        let restaurantData = restaurants.find(r => r.idRest === taula.restaurant_id);
        socket.emit('restaurant', restaurantData);
        console.log('Usuario', socket.id, 'se ha unido a la sala', id);
    });

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
                idRest: idRest, users: []
            };
            resExistant = restaurants.find(r => r.idRest === idRest);
            if (!resExistant) {
                ferFetchs(idRest).then(dades => {
                    restaurants.push({ idRest: idRest, dades: dades });
                });
            }
            socket.join(idRest);
            newSala.users.push(socket.id);
            salaAdmin.push(newSala);
            console.log('Usuario', socket.id, 'se ha unido a la sala', idRest);
        }
    });

    socket.on('generateQR', async (idRest, numTaula) => {
        let ruta = 'https://localhost:3000';
        let qrCode = await generateQRCode(`${ruta}/?restaurantId=${idRest}&tableId=${numTaula}`);
        // console.log("Ntaula", JSON.stringify(taula));
        let taula = {
            id: `${idRest}-${numTaula}`,
            restaurant_id: idRest,
            numTaula: numTaula,
            qrCode: qrCode,
            clients: [],
        }
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

    /***ALVARO***/

    socket.on('crear-comanda', (cistella) => {

        let index;

        // Fer comprovacions al node

        // Find numTaula dins de l'array taules que es correspongui amb l'ID del tiquet
        for (let i = 0; i < taules.length; i++) {
            if (taules[i].id == cistella.tiquet_id) {
                setProducteID(cistella.productes)
                taules[i].productes.push(...cistella.productes); // Si el troba fa push
                index = i;
            }
        }

        console.log(`PRODUCTES TAULA ${taules[index].id}`, taules[index].productes);
        io.emit('crear-comanda', taules[index].productes);
    });

    socket.on('modificar-producte', (tiquet_id, producte) => {

        let indexTaula;

        for (let i = 0; i < taules.length; i++) {
            if (taules[i].id == tiquet_id) {
                indexTaula = i;
            }
        }

        for (let j = 0; j < taules[indexTaula].productes.length; j++) {
            if (taules[indexTaula].productes[j].id == producte.id) {
                taules[indexTaula].productes[j].quantitat = producte.quantitat;
            }  
        }

        console.log("PRODUCTES TAULA DESPRÉS DE MODIFICAR", taules[indexTaula].productes);
        io.emit('modificar-producte', taules[indexTaula].productes);
    });

    socket.on('eliminar-producte', (tiquet_id, producte_id) => {

        let indexTaula;
        let indexProducte;

        for (let i = 0; i < taules.length; i++) {
            if (taules[i].id == tiquet_id) {
                indexTaula = i;
            }
        }

        for (let j = 0; j < taules[indexTaula].productes.length; j++) {
            if (taules[indexTaula].productes[j].id == producte_id) {
                indexProducte = j;
            }  
        }

        taules[indexTaula].productes.splice(indexProducte, 1);
        console.log("PRODUCTES TAULA DESPRÉS DE ELIMINAR", taules[indexTaula].productes);
        io.emit('eliminar-producte', taules[indexTaula].productes);
    });

    function setProducteID (productes) {
        for (let i = 0; i < productes.length; i++) {
           productes[i].id = comptadorIdProducte;
           comptadorIdProducte++;
        }
    }

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

// Iniciar el servidor en el puerto 
const PORT = 3001; // development port 
// const PORT = 3445; // production port
server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});