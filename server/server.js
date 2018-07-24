const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('createMessage', (message) => {
        console.log(message);

        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
    })


})


server.listen(PORT, () => {
    console.log(`App runing on port ${PORT}`);
})
