const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname, '/')));

io.on('connection', (socket) => {
    console.log(`A user connected...`);
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});


// const server = require('node:http').createServer();
// const io = require('socket.io')(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST']
//     }
// });

// const PORT = 3000;

// io.on('connection', (socket) => {
//     console.log(`a user connected..`);
// });

// server.listen(3000, () => {
//     console.log(`Listening on port ${PORT}...`)
// });
