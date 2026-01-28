import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import Lobby from "./models/Lobby.js";
dotenv.config();

connectDB();
// ws://localhost:8080 - notice how it is not an http server
// can either pass in a server object or the port number of the server you want instantiated
const io = new Server(8080, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {},
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  loadLobbies().then((lobbies) => {
    socket.emit("initLobbies", lobbies);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("newRoom", async (gameConfig, callback) => {
    socket.join(gameConfig.lobbyName);
    const res = await createNewLobby(gameConfig);
    callback({ ok: !!res }); // need to do proper error handling in case room can't be created for whatever reason

    if (!res) return;
    socket.emit("lobbyAdded", res);
    console.log(`Room created with name ${gameConfig.lobbyName}`);
  });
});

async function createNewLobby(gameConfig) {
  const { lobbyName, role, numberOfQuestions, numberOfCandidates } = gameConfig;
  const newJoinerRole = role === "curator" ? "navigator" : "curator";
  try {
    const addedLobby = new Lobby({
      lobbyName,
      newJoinerRole,
      numberOfCandidates,
      numberOfQuestions,
    });
    await addedLobby.save();
    return await Lobby.find(); // return all lobbies instead of just one when one is added
  } catch (error) {
    console.error("Failed to add lobby" + error);
    return false;
  }
}

async function loadLobbies() {
  try {
    const lobbies = await Lobby.find();
    return lobbies;
  } catch (error) {
    console.error("Failed to fetch lobbies");
    throw error;
  }
}
