import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import Lobby from "./models/Lobby.js";
import {
  loadLobbies,
  createNewLobby,
  offLoadAnyHostedLobbies,
} from "./controllers/lobbyController.js";
dotenv.config();

// ws://localhost:8080 - notice how it is not an http server
// can either pass in a server object or the port number of the server you want instantiated
// OR just the options, then listen to the port later
const io = new Server({
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {},
});
connectDB().then(() => io.listen(8080)); // want db connected THEN server starts

io.on("connection", (socket) => {
  const hostId = socket.id;
  console.log(`${hostId} connected`);

  loadLobbies().then((lobbies) => {
    socket.emit("initLobbies", lobbies);
  });

  socket.on("disconnect", async () => {
    const deletedLobbies = await offLoadAnyHostedLobbies(hostId);
    console.log("user disconnected. Total deleted lobbies: " + deletedLobbies);
    // io.in("room_name").disconnectSockets()
  });

  socket.on("newRoom", async (gameConfig, callback) => {
    socket.join(gameConfig.lobbyName);
    const res = await createNewLobby(gameConfig);
    callback({ ok: !!res }); // need to do proper error handling in case room can't be created for whatever reason

    if (!res) return;
    io.emit("lobbyAdded", res);
    console.log(`Room created with name ${gameConfig.lobbyName}`);
  });

  socket.on("joinRoom", async (lobbyName, callback) => {
    try {
      // fetch the lobby details
      const lobbyDetails = await Lobby.findOne({ lobbyName });
      socket.join(lobbyName);
      callback(lobbyDetails);
    } catch (error) {
      console.error(error);
      callback(null);
    }
  });

  socket.on("nextStep", (currentGameState, callback) => {
    try {
      const room = currentGameState?.lobbyName;
      io.to(room).emit("nextStep", currentGameState);
      callback({ ok: true });
    } catch (error) {
      console.error("Unable to send new game state to room" + room);
      callback({ ok: false });
    }
  });

  socket.on("eliminateItem", (currentGameState) => {
    const { lobbyName, value } = currentGameState;
    const room = lobbyName;
    io.to(room).emit("eliminateItem", value);
  });

  socket.on("showResults", async (endGameState, callback) => {
    const { lobbyName, value } = endGameState;
    const room = lobbyName;
    io.to(room).emit("showResults", value);
    try {
      const lobby = await Lobby.deleteOne({ lobbyName });
      // io.in(room).disconnectSockets();
      console.log("Finished game " + lobby.acknowledged);
      callback({ ok: true });
    } catch (e) {
      console.error(e);
      callback({ ok: false });
    }
  });
});
