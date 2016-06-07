module.exports = function () {
    var wsRoutes = require('./ws-routes')(),
        serialPort = require('./serial-port')(),
        WebSocket = require('./web-socket')();

};