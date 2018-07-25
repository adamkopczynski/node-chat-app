const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
    })

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        callback();
    })

    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords))
        }

    })

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required!');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUsersList', users.getUsersList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        
        callback();
    })


})


server.listen(PORT, () => {
    console.log(`App runing on port ${PORT}`);
})
