const jsonServer = require('json-server');
const server = jsonServer.create();
const routerCart = jsonServer.router('cart.json'); // Path to cart.json
const routerDb = jsonServer.router('db.json'); // Path to db.json
const middlewares = jsonServer.defaults();

// Cart API on port 3002
const cartServer = jsonServer.create();
cartServer.use(middlewares);
cartServer.use(routerCart);

// DB API on port 3001
server.use(middlewares);
server.use(routerDb);

// Listen on two different ports
cartServer.listen(3002, () => {
  console.log('JSON Server for cart is running on port 3002');
});

server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server for db is running on port 3001');
});
