const combineRouters = require('koa-combine-routers');
const subscriptionRoutes = require('./subscriptions');
const rootRouter = require('./root/root');

const router = combineRouters(
  subscriptionRoutes,
  rootRouter
);

module.exports = router;