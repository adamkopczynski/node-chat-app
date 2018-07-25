const moment = require('moment');

function generateMessage(from, text){
    return{
        from,
        text,
        createdAt: moment.valueOf()
    }
}

function generateLocationMessage(from, coords){
    return{
        from,
        url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: moment.valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage}