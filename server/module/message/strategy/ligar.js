"use strict";
class Ligar {

    constructor (info) {
        this._info = info;
        this.store = require('../../../store');
    }

    start () {
        return new Promise(execute.bind(this));
        function execute (resolve, reject) {
            try {
                if (this.store.getUser(this._info.chat.id)) {
                    resolve({
                        _id : this._info.chat.id,
                        message : "Você já está cadastrado."
                    });
                } else {
                    var userInfo = {};
                    var _id = this._info.chat.id;

                    userInfo.firstName = this._info.chat.first_name;
                    userInfo.lastName = this._info.chat.last_name;

                    this.store.setUser(_id, userInfo);

                    resolve({
                        _id : _id,
                        message : "" + userInfo.firstName + " " + userInfo.lastName + " cadastrado ao envio de mensagens."
                    });
                }
            } catch (error) {
                reject(error);
            }
        }
    }
};

module.exports = Ligar;

