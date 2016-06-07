module.exports = function (message, info) {
    return new Promise(onResponseMessage.bind(this));
    function onResponseMessage (resolve, reject) {
        var MessageModule,
            messageModule,
            promise;
        try {
            MessageModule = require('./strategy/' + message);

            if (!MessageModule) {
                throw new Error("Comando inválido.");
            }

            messageModule = new MessageModule(info);
            promise = messageModule.start();
            promise.then(onSuccess.bind(this), onError);

        } catch (error) {
            reject("Comando inválido");
        }

        function onSuccess (response) {
            resolve(response);
        }

        function onError (err) {
            reject(err);
        }
    }

};