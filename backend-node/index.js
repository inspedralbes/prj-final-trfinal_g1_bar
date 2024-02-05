const qr = require('qrcode');
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const { log } = require('node:console');

const app = express();
app.use(cors())


// taula = {
//     id: 1,
//     numTaula: 1,
//     restaurant: 1,
//     ocupants: 0,
//     ocupantsUsr: [{
//         id: 1,
//         nom: "Pepito",
//         email: "",
//         carrito: [{
//             prducteid: 1,
//             producteNom: "Coca Cola",
//             preu: 1.5,
//             quantitat: 2,
//             observacions: "Sense sucre",
//         }],
//     }],
//     qr: '',
// };

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

    //crear rooms de sockets
    socket.on('crear-sala', (numTaula, idRest) => {
        // Comprovar si ja existeix una sala amb el mateix nom
        if (sales.find(s => s.nomSala === sala.nom)) {
            return;
        }

        // Crear nova sala
        let novaTaula = {
            socketN: `${idRest}/${numTaula}`,
            id: null,
            numTaula: null,
            restaurant: null,
            ocupants: 0,
            ocupantsUsr: [{
                id: null,
                nom: null,
                email: null,
                carrito: [{
                    prducteid: null,
                    producteNom: null,
                    preu: null,
                    quantitat: null,
                    observacions: null,
                }],
            }],
            qr: null,
        }
        taules.push(novaTaula);
        io.emit('sala-creada', novaTaula);
    });

    socket.on('joinRoom', (room) => {
        socket.join(taules.find(t => t.socketN === room));
        console.log('Usuario', socket.id, 'se ha unido a la sala', room);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(taules.find(t => t.socketN === room));
        console.log('Usuario', socket.id, 'ha abandonado la sala', room);
    });

    socket.on('generateQR', async () => {
        let ruta = 'https://localhost:3000/restaurant1/taula2';
        const qrCode = await generateQRCode(ruta);
        socket.emit('QRGenerated', qrCode);
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