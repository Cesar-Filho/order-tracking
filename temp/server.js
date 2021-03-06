const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('temp/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(router);
server.listen(process.env.REACT_APP_PORT || 3003, () => console.log('JSON Server is running'));
