const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname, '/')));

let readyPlayerCount = 0;

io.on('connection', (socket) => {
    console.log(`A user connected as...`, socket.id);

    socket.on('ready', () => {
        console.log('Player ready', socket.id);

        readyPlayerCount++;

        if (readyPlayerCount === 2) {
            io.emit('startGame', socket.id);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
