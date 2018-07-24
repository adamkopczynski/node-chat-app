const socket = io();

$('.message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Adam', 
        text: $('[name=message]').val()
    })
})

socket.on('newMessage', (message) => {
    console.log(message)

    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('.messages-list').append(li);
})

$('.share-location-btn').on('click', (e) => {
    e.preventDefault();

    if(!navigator.geolocation){
       return alert('Geolocation is not supported by your browser.')
    }
    
    navigator.geolocation.getCurrentPosition(function (position){

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

    }, function(){
        alert('Unable to fetch the location.')
    })
})

socket.on('newLocationMessage', (message) => {

    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('.messages-list').append(li);
})