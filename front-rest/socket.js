import io from 'socket.io-client';
import useAppStore from './stores/index.js';

// Connect to the server
const url = 'http://localhost:3001';

const socket = io(url);

export default socket;

// Handle connection event
socket.on('connect', () => {
    console.log('Connected to server');

    const appStore = useAppStore();

    socket.on('QRGenerated', (data) => {
        console.log('QRGenerated', data);
        appStore.setQr(data);
    });

    socket.on('tiquet', (data) => {
        console.log("tiquet", data);
    });

    socket.on('categories', (data) => {
        console.log("categories", data);
    });

    socket.on('productes', (data) => {
        console.log("productes", data);
    });

    socket.on('ingredients', (data) => {
        console.log("ingredients", data);
    });

    socket.on('allIngredients', (data) => {
        console.log("allIngredients", data);
    });
});

// Handle socket errors
socket.on('error', (error) => {
    console.error('Socket error:', error);

});

// Handle disconnection event
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
