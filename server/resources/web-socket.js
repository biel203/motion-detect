module.exports = function () {
    var store = require('../store');
    var config = require('../config.json');
    var wss = global.socket;
    
    wss.on('connection', function (ws) {
        store.setWSUser(ws);
        store.sendUsersToClient();
    });

};