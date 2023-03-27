// const { io } = require("../index");
// const Band = require("../models/band");
// const Bands = require("../models/bands");

// const bands = new Bands();

// bands.addBand(new Band('Queen'));
// bands.addBand(new Band('Bon Jovi'));
// bands.addBand(new Band('Don tetto'));
// bands.addBand(new Band('Metallica'));

// // console.log(bands);

// // Mensajes de Sockets
// io.on("connection", (client) => {
//   console.log("Cliente conectado");

//   client.emit('active-bands', bands.getBands());

//   client.on("disconnect", () => {
//     console.log("cliente desconectado");
//   });
//   client.on("mensaje", (payload) => {
//     console.log("Mensaje!!!", payload);
//     io.emit("Mensaje", { admin: "Nuevo mensaje" });
//   });

  
//   client.on("new-message", (payload) => {
//     console.log("new message", payload);
//     io.emit("new-message", payload); // En este caso lo emite a todos
//     client.broadcast.emit("new-message", payload); // Aqui solo lo emite a todos menos al que lo emitio
//   });
  
//   client.on('vote-band', (payload) => {
//     bands.voteBand(payload.id);
//     io.emit('active-bands', bands.getBands());
//   });
  
//   client.on("add-band", (payload) => {
//     const newBand = new Band(payload.name);
//     bands.addBand(newBand);
//     io.emit('active-bands', bands.getBands());
//   });

  
//   client.on("delete-band", (payload) => {
//     console.log(payload);
//     bands.deletedBand(payload.id);
//     io.emit('active-bands', bands.getBands());
//   })
// });
