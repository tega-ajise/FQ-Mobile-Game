import { LobbyDetails } from '@/types/types';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface AppContextType {
  socket: Socket | null;
  lobbies: LobbyDetails[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [lobbies, setLobbies] = useState<LobbyDetails[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
    });
    socketRef.current = socket;

    // will have to put this link into the EXPO environment variables later

    socket.on('initLobbies', (allLobbies: LobbyDetails[]) => {
      setLobbies(allLobbies);
    });

    // seems like can only handle incoming events in the AppContext
    socket.on('lobbyAdded', (allLobbies: LobbyDetails[]) => {
      console.log('Refreshing lobbies');
      setLobbies(allLobbies);
    });

    return () => {
      socket.off('initLobbies');
      socket.off('lobbyAdded');
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <AppContext.Provider value={{ socket: socketRef.current, lobbies }}>
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
