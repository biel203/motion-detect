var express = require('express'),
    url = require('url'),
    app = express(),
    server = require('http').createServer(),
    WebSocketServer = require('ws').Server,
    wSocket = new WebSocketServer({ server: server }),
    path = require('path'),
    resources = require('./server/resources/index'),
    routes = require('./server/routes');

var port = process.env.NODE_PORT || 8080,
    ipAddress = process.env.NODE_IP || "127.0.0.1";
//Rotas estáticas;
app.use('/', express.static(path.resolve(__dirname, 'client')));
global.socket = wSocket;

//Carregamento das Rotas REST;
app.use(routes);

server.on('request', app);
server.listen(port, ipAddress, function(){
    resources();
    console.log(server.address());
    console.log('Servidor Motion Detect rodando! Porta : ' + port);
});