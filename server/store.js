module.exports = {

    _TelegramAPI : null,
    _users : {},
    _WSUsers : [],

    getTelegramAPI : function () {
        return this._TelegramAPI;
    },
    setTelegramAPI : function (value) {
        this._TelegramAPI = value;
    },

    setUser : function (_id, info) {
        this._users[_id] = info;
        this.sendUsersToClient.call(this);
    },

    getUserList : function () {
        return this._users;
    },

    getUser : function (_id) {
        return this._users[_id];
    },

    pullUser : function (_id) {
        delete this._users[_id];
        this.sendUsersToClient.call(this);

    },
    
    setWSUser : function (info) {
        this._WSUsers.push(info);
    },

    getWSUser : function () {
        return this._WSUsers;
    },

    sendUsersToClient : function () {
        var users = global.socket.clients;
        var info = JSON.stringify({userList : this._users});

        for(var i = 0, len = users.length; len--; i += 1) {
            users[i].send(info);
        }
    }
};