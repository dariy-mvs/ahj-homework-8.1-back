const cors = require('@koa/cors');
const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes');
const WS = require('ws');
const http = require('http');

const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true,
  text: true,
  json: true,
  multipart: true,
}));

app
  .use(router());
  //.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws, req) => {
  ws.on('message', msg => {
     console.log('msg');
    // ws.send('response');
    [...wsServer.clients]
    .filter(o => o.readyState === WS.OPEN)
    .forEach(o => o.send('some message'));
  });

  ws.send('welcome');
});

app.listen(port, () => console.log('Server is works'));
