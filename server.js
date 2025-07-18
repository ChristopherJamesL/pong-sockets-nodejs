const http = require('http');
const socketIo = require('socket.io');
const sockets = require('./sockets');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = socketIo(httpServer);

const PORT = 3000;

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

sockets.listen(socketServer);
