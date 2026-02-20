import { GameConfig, GameLoopState, LobbyDetails } from '@/types/types';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Constants from 'expo-constants';

type TGameState = ((GameConfig | GameLoopState) & { stepIdx: number }) | undefined;

interface AppContextType {
  socket: Socket | null;
  lobbies: LobbyDetails[];
  waitingForJoiner: boolean;
  setWaitingForJoiner: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: TGameState;
  setGameState: React.Dispatch<React.SetStateAction<TGameState>>;
  resultState: { position: number; question: string }[] | undefined;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [waitingForJoiner, setWaitingForJoiner] = useState<boolean>(true);
  const [lobbies, setLobbies] = useState<LobbyDetails[]>([]);
  const [gameState, setGameState] = useState<TGameState>();
  const [resultState, setResultState] = useState<{ position: number; question: string }[]>();
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const url = Constants?.expoConfig?.extra?.EXPO_PUBLIC_URL;

    const socket = io(url, {
      reconnectionDelayMax: 10000,
    });
    socketRef.current = socket;

    socket.on('initLobbies', (allLobbies: LobbyDetails[]) => {
      setLobbies(allLobbies);
    });

    // seems like can only handle incoming events in the AppContext
    socket.on('lobbyChange', (lobbyStatus: LobbyDetails & { status?: 'ok' }) => {
      console.log('Refreshing lobbies.');

      // means room has been completed
      if (lobbyStatus.status && lobbyStatus.status === 'ok') {
        setLobbies((prev) => {
          const lobbyIdx = prev.findIndex((lby) => lby.lobbyName === lobbyStatus.lobbyName);
          return prev.toSpliced(lobbyIdx, 1); // ensures that only active lobbies are shown in the lobby list
        });
        setWaitingForJoiner(false);
      } else {
        setLobbies((prev) => [...prev, lobbyStatus]);
      }
    });

    socket.on('nextStep', (gs: TGameState) => {
      setGameState(gs);
    });

    socket.on('eliminateItem', (value: string) => {
      setGameState((prev) => {
        if (!prev) return prev;
        const gs = prev as GameLoopState & { stepIdx: number };
        if (!gs.candidates) return prev;
        const newCandidates = gs.candidates.map((c) =>
          c.content === value ? { ...c, isEliminated: true } : c
        );

        return {
          ...gs,
          candidates: newCandidates,
          stepIdx:
            prev.stepIdx + 1 !== prev.roundQuestions?.length ? prev.stepIdx + 1 : prev.stepIdx,
        };
      });
    });

    socket.on('showResults', (value: string) => {
      setIsGameOver(true);
      setResultState((prev) => {
        const finalResult = prev?.filter((val) => val.question === value);
        return finalResult;
      });
    });

    return () => {
      socket.off('initLobbies');
      socket.off('lobbyChange');
      socket.off('nextStep');
      socket.off('eliminateItem');
      socket.off('showResults');
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    setResultState(() => {
      if ((gameState as GameLoopState)?.candidates?.[0]?.content) {
        return (gameState as GameLoopState)?.candidates?.map((val, idx) => ({
          position: idx,
          question: val.content,
        }));
      }
      return undefined;
    });
  }, [gameState]);

  return (
    <AppContext.Provider
      value={{
        socket: socketRef.current,
        lobbies,
        waitingForJoiner,
        setWaitingForJoiner,
        gameState,
        setGameState,
        resultState,
        isGameOver,
        setIsGameOver,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App context must be used within an App Provider');
  }
  return context;
};

export default AppProvider;
