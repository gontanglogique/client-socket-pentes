require('dotenv').config();

const express = require('express');
const path = require('path');
const emitCountdownRoute = require('./routes/emitCountdown');


const app = express();
const port = process.env.PORT || 3009;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Sajikan file statis dari folder 'public'

// Route untuk endpoint hit countdown
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', emitCountdownRoute);

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});