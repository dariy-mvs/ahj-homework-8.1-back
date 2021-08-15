const Router = require('@koa/router');
const { names } = require('../db/db');

const router = new Router({ prefix: '/deletename' });

router.post('/', (ctx) => {
  const userName = JSON.parse(ctx.request.body).name;
  const nameInd = names.findIndex((el) => el === userName);
  names.splice(nameInd, 1);
});

module.exports = router;
