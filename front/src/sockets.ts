import io from 'socket.io-client';

// Connect to the server
const socket = io('http://localhost:3001');

export default socket;

// Handle connection event
socket.on('connect', () => {
    console.log('Connected to server');
});

// Handle disconnection event
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
