const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = '7983165912:AAFirsh3_6aSQOymL5FFqyhKUph4mtGYd28';
const bot = new TelegramBot(token);

const app = express();
app.use(bodyParser.json());

// Webhook route for Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body); // process incoming updates from Telegram
  res.sendStatus(200);
});

bot.setWebHook(`https://telegram-mini-app-drab.vercel.app/bot${token}`);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello! This bot tells you the time and date.');
});

bot.onText(/\/time/, (msg) => {
  const currentTime = new Date().toLocaleString();
  bot.sendMessage(msg.chat.id, `Current time and date: ${currentTime}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});