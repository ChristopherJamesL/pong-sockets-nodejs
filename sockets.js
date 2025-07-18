let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    pongNamespace.on('connection', (socket) => {
        let room;

        console.log(`A user connected as...`, socket.id);
        
        socket.on('ready', () => {
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            console.log('Player ready', socket.id, room);
            
            readyPlayerCount++;
            
            console.log('Ready Player Count: ', readyPlayerCount);
            if (readyPlayerCount >= 2 && readyPlayerCount % 2 === 0) {
                pongNamespace.to(room).emit('startGame', socket.id);
            }
        });
    
        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        });
    
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        });
    
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`);
        });
    });
}

module.exports = { 
    listen,
};