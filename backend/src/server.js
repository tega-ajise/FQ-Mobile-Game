import { Server } from "socket.io";

// ws://localhost:8080
const io = new Server(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
});
