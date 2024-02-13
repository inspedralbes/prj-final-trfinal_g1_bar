import { io } from 'socket.io-client';

const URL = 'http://localhost:3001'

// Connect to the server
export const socket = io(URL);

// Handle connection event
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('crear-comanda', (cistella) => {
    console.log('socket crear-comanda', cistella);
});

// Handle disconnection event
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
