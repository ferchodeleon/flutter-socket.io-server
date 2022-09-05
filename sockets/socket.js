const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");
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
