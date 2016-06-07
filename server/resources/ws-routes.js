module.exports = function () {
    var store = require('../store');
    var config = require('../config.json');
    var messageMediator = require('../module/message/mediator');
    var TelegramAPI = require('telegram-bot-api');
    var telegramAPI = new TelegramAPI({
        token: "129001682:AAEj2dvBUNOrko4gO4DMkmVYcVBO7Li8OSI",
        updates: {
            enabled: true
        }
    });

    store.setTelegramAPI(telegramAPI);

    telegramAPI.on('message', onReceiveMessage.bind(this));
    function onReceiveMessage (info) {
        try {
            var tag = config.command.initalTag;

            //Expressão regular para verificar se o texto passado comaça com a Tag recomendada para comando.
            var regex = new RegExp("^\\" + tag);
            if (!regex.test(info.text)) {
                throw new Error("O comando terá que começar com "+ tag +"\n Ex : "+tag+"help");
            }

            //Retira a Tag que foi definida para o comando deixando apenas a palavra
            // Ex : "*ligar" para "ligar"
            regex = new RegExp("\\"+tag+"(.*)");
            info.text = info.text.match(regex)[1];

            var promise = messageMediator(info.text, info);
            promise.then(onResponse.bind(this), onError.bind(this));

        } catch (error) {
            var message;
            if (error.message) {
                message = error.message
            } else {
                message = "Erro durante a operação";
            }

            telegramAPI.sendMessage({
                chat_id : info.chat.id,
                text : message
            })
        }

        function onResponse (response) {
            try {
                telegramAPI.sendMessage({
                    chat_id : response._id,
                    text : response.message
                })
            } catch (error) {
                telegramAPI.sendMessage({
                    chat_id : chatID,
                    text : "Erro durante a operação. Erro : " + error
                })
            }
        }

        function onError (error) {
            telegramAPI.sendMessage({
                chat_id : info.chat.id,
                text : "Erro durante a operação. Erro : " + error
            })
        }
    }

    // telegramAPI.on('update', onReceiveUpdate.bind(this));
    function onReceiveUpdate (update) {
        console.log(update)
    }
};