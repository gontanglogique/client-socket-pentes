require('dotenv').config();

const express = require('express');
const router = express.Router();
const io = require('socket.io-client');

const socket_url = process.env.SOCKET_URL || "http://localhost:3002"

// Koneksi ke server socket eksternal
// const socket = io.connect("http://localhost:3002",{
//     'reconnection': true,
//     'reconnectionDelay': 1000,
//     'reconnectionDelayMax': 5000,
//     'reconnectionAttempts': 5,
//     query: { token: '$2a$08$wdifQlrsDzRpPDMN390D2e7.pJvWDVSdOZtRqMMtDeXEvDA./zQlm@jba_car' },
//     'transports': ["websocket"]
// });

const socket = io.connect(socket_url, {
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 5000,
    'reconnectionAttempts': 5,
    query: { 
        token: '$2a$08$icWJ0dsIXu/YSh4DyT8lzOOI9qUfXB3KXTSUs2laAGg4vwknXSyQO@jba_car',
        role : "2"
    },
    'transports': ["websocket"]
  });

// Logging saat terhubung
socket.on('connect', () => {
    console.log(`Connected to socket server at ${socket_url}`);
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error.message);  // Misalnya "Invalid token"
});

// Endpoint untuk memicu event countdown ke server socket
router.post('/emit-countdown', (req, res) => {
    const { run_id, action } = req.body;
    console.log("HIT => ", req.body)
    // // Emit event countdown ke server socket melalui socketClient
    try {
        socket.emit('countdown', { 
            "run_id": run_id, 
            "action": action
        });
    } catch (error) {
        console.error('Error processing countdown:', error);  // Log any errors
        return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Countdown event sent to socket', run_id, action });
});

module.exports = router;