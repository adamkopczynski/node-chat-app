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
    
    socket.emit('newMessage', {from: 'Admin', text: 'Welcome to the chat app'});
    socket.broadcast.emit('newMessage', {from: 'Admin', text: 'New user joined.'})

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('createMessage', (message) => {
        console.log(message)
    })

    socket.emit('emit', {from: 'Jean', text: 'Some text from server'})


})


server.listen(PORT, () => {
    console.log(`App runing on port ${PORT}`);
})
