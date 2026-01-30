import Lobby from "../models/Lobby.js";

async function createNewLobby(gameConfig) {
  const { lobbyName, role, numberOfQuestions, numberOfCandidates, hostId } =
    gameConfig;
  const newJoinerRole = role === "curator" ? "navigator" : "curator";
  try {
    const addedLobby = new Lobby({
      lobbyName,
      newJoinerRole,
      numberOfCandidates,
      numberOfQuestions,
      hostId,
    });
    await addedLobby.save();
    return addedLobby;
  } catch (error) {
    console.error("Failed to add lobby " + error);
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

async function offLoadAnyHostedLobbies(host) {
  try {
    const hostedLobbies = await Lobby.deleteMany({ hostId: host });
    return hostedLobbies.deletedCount;
  } catch (error) {
    console.error(`Failed to delete lobbies with host ${host}`);
    throw error;
  }
}

export { createNewLobby, loadLobbies, offLoadAnyHostedLobbies };
