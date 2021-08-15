const Router = require('@koa/router');
const { names } = require('../db/db');

const router = new Router({ prefix: '/username' });

router.post('/', (ctx) => {
  const userName = ctx.request.body.username;

  const nameIsLock = names.some((el) => el === userName);
  if (nameIsLock) {
    ctx.response.body = { nameIsFree: false };
  } else {
    names.push(userName);
    ctx.response.body = { nameIsFree: true };
  }
});

module.exports = router;
