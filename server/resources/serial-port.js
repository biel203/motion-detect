module.exports = function () {
    var SerialPort = require("serialport").SerialPort;
    var serialPort = new SerialPort("COM3");
    var moment = require('moment');
    require('moment/locale/pt-br');
    var store = require("../store");
    var telegramAPI = store.getTelegramAPI();

    // PORTA SERIAL
    serialPort.on('data', function(data){
        var users;
        try {
            users = store.getUserList();

            if (data.toString('UTF-8') == 1) {
                for(var key in users) {
                    telegramAPI.sendMessage({
                        chat_id : key,
                        text : "Movimento detectado " + moment().format('L') + " às " + moment().format('LT') + "."
                    });
                }
            } else {
                if (data.toString('UTF-8') == 0) {
                    for(var key in users) {
                        telegramAPI.sendMessage({
                            chat_id : key,
                            text : "Não há mais movimentação."
                        });
                    }
                }
            }

        } catch (err) {
            console.log('danada');
        }

    });
};