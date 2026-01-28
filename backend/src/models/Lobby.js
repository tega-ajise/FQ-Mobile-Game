import mongoose from "mongoose";

// create a schema
// first arg is the fields, second is any additional optional fields
const lobbySchema = new mongoose.Schema(
  {
    lobbyName: {
      type: String,
      required: true,
      unique: true,
    },
    newJoinerRole: {
      type: String,
      required: true,
    },
    numberOfQuestions: {
      type: Number,
      required: true,
    },
    numberOfCandidates: {
      type: Number,
      required: true,
    },
    hostId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// create a model based on that schema
const Lobby = mongoose.model("Lobby", lobbySchema);
export default Lobby;
