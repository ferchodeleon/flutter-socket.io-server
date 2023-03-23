const express = require("express");
const path = require("path");
require("dotenv").config();

//DB config
// const {dbConnection} = require('./database/config');
// dbConnection(); Este es una forma de llamar un paquete

//Esta es otra forma de llamar un paquete.
require('./database/config').dbConnection();

// App de Express
const app = express();

//Lectura y parseo del body
app.use(express.json());

// Mis rutas
app.use('/api/login', require('./routes/auth'));

//Node server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log("Sevidor corriendo en puerto", process.env.PORT);
});
