"use strict";
class Desligar {

    constructor (info) {
        this._info = info;
        this.store = require('../../../store');
    }

    start () {
        return new Promise(execute.bind(this));
        function execute (resolve, reject) {
            try {
                this.store.pullUser(this._info.chat.id);
                resolve("Você saiu da lista de envio de mensagens");
            } catch (error) {
                reject(error);
            }
        }
    }
};

module.exports = Desligar;

