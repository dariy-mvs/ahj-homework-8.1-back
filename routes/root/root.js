const Router = require('@koa/router');

const router = new Router({ prefix: '/getnames' });
const db = require('../db/db');

const { names } = db;

router.get('/', async (ctx) => {
  ctx.body = names;
});

module.exports = router;
