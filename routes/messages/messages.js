const Router = require('@koa/router');
const { messages } = require('../db/db');

const router = new Router({ prefix: '/setmessage' });

router.post('/', (ctx) => {
  const { messagetext: messageText, username: userName, time } = ctx.request.body;
  const id = messages.length;
  const messageObj = {
    author: userName,
    text: messageText,
    time,
    messageId: id,
  };
  messages.push(messageObj);
  ctx.response.body = { status: 'ok' };
  // console.log(messages);
});

module.exports = router;
