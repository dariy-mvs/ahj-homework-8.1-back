// const http = require('http');
// const cors = require('@koa/cors');
// const Koa = require('koa');
// const koaBody = require('koa-body');
// const router = require('./routes');
// const WS = require('ws');

// const app = new Koa();

// app.use(koaBody({
//   urlencoded: true,
//   text: true,
//   json: true,
//   multipart: true,
// }));

// app.use(cors({
//   origin: "*",
//   credentials: true,
//   "Access-Control-Allow-Origin": true,
//   allowMethods: ["GET", "POST", "PUT", "DELETE"],
// }));

// app.use(router());

// const port = process.env.PORT || 7070;
// const server = http.createServer(app.callback());
// const wsServer = new WS.Server({ server });
// //console.log(wsServer);

// wsServer.on('connection', (ws, req) => {
//   ws.on('message', msg => {
//      console.log('msg');
//   });

//   ws.send('welcome');
// });

// app.listen(port, () => console.log('Server is works'));

const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const WS = require('ws');

const app = new Koa();
const koaBody = require('koa-body');
const router = require('./routes');
const db = require('./routes/db/db');

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use(koaBody({
  urlencoded: true,
  text: true,
  json: true,
  multipart: true,
}));

app.use(router());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws) => {
  ws.on('message', () => {
    const { messages } = db;
    const messagesJson = JSON.stringify(messages);
    [...wsServer.clients]
      .filter((o) => o.readyState === WS.OPEN)
      .forEach((o) => o.send(messagesJson));
  });

  // ws.send('welcome');
});

// app.listen(port, () => console.log('Server is works'));

server.listen(port);
