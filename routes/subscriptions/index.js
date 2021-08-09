const Router = require('@koa/router');
const { names } = require('../db/db');

const router = new Router({prefix: '/username'});

router.post('/', (ctx) => {
  const userName = ctx.request.body.username;
  console.log(userName);
  const nameIsLock = names.some(el => {
    return el === userName;
  });
  if (nameIsLock) {
    ctx.response.body = {nameIsFree: false};
  } else {
    names.push(userName);
    ctx.response.body = { nameIsFree: true};
    };
});

module.exports = router;