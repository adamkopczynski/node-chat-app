const socket = io();

$('.message-form').on('submit', function (e) {
    e.preventDefault();
  
    var messageTextbox = $('[name=message]');
  
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function () {
      messageTextbox.val('')
    });
  });

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('.messages').append(html);
})

let locationBtn = $('.share-location-btn');
locationBtn.on('click', (e) => {
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
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('.messages').append(html);
})