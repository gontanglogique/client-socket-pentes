const { io } = require('socket.io-client');

// Koneksi ke server socket eksternal
const socket = io("http://localhost:3002");

// Logging saat terhubung
socket.on('connect', () => {
    console.log('Connected to socket server at http://localhost:3002');
});