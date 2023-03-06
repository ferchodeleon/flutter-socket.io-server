const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Don tetto'));
bands.addBand(new Band('Metallica'));

console.log(bands);

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit('active-bands', bands.getBands());

  client.on("disconnect", () => {
    console.log("cliente desconectado");
  });
  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload);
    io.emit("Mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("new-message", (payload) => {
    console.log("new message", payload);
    io.emit("new-message", payload); // En este caso lo emite a todos
    client.broadcast.emit("new-message", payload); // Aqui solo lo emite a todos menos al que lo emitio
  });
});
