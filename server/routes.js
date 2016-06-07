var express = require('express');
var router = express.Router();

var TelegramCommand = require('./command/telegram/motion-detect'),
    telegramCommand;

telegramCommand = new TelegramCommand();
router.get('/api/telegram/motion', telegramCommand.start);

module.exports = router;