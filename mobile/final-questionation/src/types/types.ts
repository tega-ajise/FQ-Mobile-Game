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
