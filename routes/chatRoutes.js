const express = require('express');
const chatRouter= express.Router();
const { sendMessage, retrieveMessages } = require('../controller/chatController');

chatRouter.post('/sendMessage', sendMessage);
chatRouter.get('/retrieveMessages', retrieveMessages);

module.exports = {chatRouter};
