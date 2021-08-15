const combineRouters = require('koa-combine-routers');
const subscriptionRoutes = require('./subscriptions');
const deleteRoutes = require('./subscriptions/deleteName');
const messages = require('./messages/messages');
const rootRouter = require('./root/root');

const router = combineRouters(
  subscriptionRoutes,
  deleteRoutes,
  rootRouter,
  messages,
);

module.exports = router;
