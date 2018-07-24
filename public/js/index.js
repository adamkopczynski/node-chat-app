const socket = io();

$('.message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Adam', 
        text: $('[name=message]').val()
    })
})

socket.on('newMessage', (message) => {

    let li = $('<li class="message"></li>');
    li.text(`${message.from}: ${message.text}`);
    $('.messages').append(li);
})

let locationBtn = $('.share-location-btn');
locationBtn.on('click', (e) => {
    e.preventDefault();

    locationButton.attr('disabled', 'disabled').text('Sending..');

    if(!navigator.geolocation){
       return alert('Geolocation is not supported by your browser.')
    }
    
    navigator.geolocation.getCurrentPosition(function (position){

        locationButton.removeAttr('disabled').text('Share location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

    }, function(){
        locationButton.removeAttr('disabled').text('Share location');
        alert('Unable to fetch the location.')
    })
})

socket.on('newLocationMessage', (message) => {

    let li = $('<li class="message"></li>');
    let a = $('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('.messages').append(li);
})