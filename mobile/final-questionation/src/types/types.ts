export type BaseGameConfig = { numberOfQuestions: number; numberOfCandidates: number };

export interface LobbyDetails extends BaseGameConfig {
  lobbyName: string;
  newJoinerRole: 'curator' | 'navigator';
}

export interface GameConfig {
  lobbyName?: string;
  roundQuestions?: string[];
  candidates?: string[];
}

export interface MongoDBLobbyModel extends BaseGameConfig {
  createdAt: Date;
  updatedAt: Date;
  hostId: string;
  [metadata: string]: any;
}

export interface GameLoopState {
  lobbyName?: string;
  roundQuestions: string[];
  candidates: { content: string; isEliminated: boolean }[];
}
