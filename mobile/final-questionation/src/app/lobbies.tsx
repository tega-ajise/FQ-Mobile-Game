import { View, FlatList, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { useAppContext } from '@/hooks/AppProvider';
import WaitingScreen from '@/components/WaitingScreen';
import AppText from '@/components/AppText';
import AppTextInput from '@/components/AppTextInput';
import { useGameContext } from '@/hooks/GameProvider';

const Lobbies = () => {
  const { lobbies, socket } = useAppContext();
  const { playerRole, setSetupCounts, updateGameConfig } = useGameContext();
  const router = useRouter();

  const [manualLobbyEntry, setManualLobbyEntry] = useState<string>('');

  const lobbyEntryValidation = (selectedLobby?: string) => {
    const lobby =
      lobbies.find((lby) => lby.lobbyName === manualLobbyEntry)?.lobbyName ?? selectedLobby;
    if (!lobby && !selectedLobby) {
      return Alert.alert('Lobby not found', 'Please try another lobby name');
    }
    socket
      ?.emitWithAck('joinRoom', lobby)
      .then((gameState) => {
        if (!gameState) throw new Error('Could not join room');

        const { newJoinerRole, numberOfCandidates, numberOfQuestions, lobbyName } = gameState;
        playerRole.current = newJoinerRole;
        setSetupCounts({ numberOfCandidates, numberOfQuestions });
        updateGameConfig({ lobbyName });

        router.push({ pathname: '/[gameplay]', params: { gameplay: lobby } });
      })
      .catch((err) => Alert.alert(err, 'Please try again'));
  };

  return (
    <View className="flex-1 bg-background">
      <View className="m-4">
        <AppText className="text-xl text-secondary">Enter Lobby Name</AppText>
        <View className="flex flex-row items-center gap-4">
          <AppTextInput
            value={manualLobbyEntry}
            onChangeText={(txt) => setManualLobbyEntry(txt)}
            className="h-[73px] w-[280px]"
          />
          <Pressable
            className="h-[55px] w-[66px] rounded-2xl bg-btnprimary shadow-[0px_4.6px_0px_rgba(40,118,40,1)]"
            onPress={() => lobbyEntryValidation()}>
            <Entypo name="controller-play" size={52} color="white" style={{ margin: 'auto' }} />
          </Pressable>
        </View>
      </View>
      <View className="m-2 w-full border-t border-outline" />
      <View className="px-8 py-4">
        <FlatList
          data={lobbies}
          keyExtractor={(item, index) => `${item.lobbyName} - ${index}`}
          renderItem={({ item }) => {
            return (
              <View className="flex flex-row justify-between rounded-2xl border-2 border-outline p-4">
                <View className="flex-col gap-1">
                  <AppText className="text-2xl text-primary">{item.lobbyName}</AppText>
                  <AppText className="text-xl text-accent">{item.newJoinerRole}</AppText>
                  <AppText className="text-sm text-[#868584]">
                    Rounds: {item.numberOfQuestions}, Candidates: {item.numberOfCandidates}
                  </AppText>
                </View>
                <Link
                  href={{
                    pathname: '/[gameplay]',
                    params: { gameplay: item?.lobbyName ?? '' },
                  }}
                  asChild>
                  <Pressable
                    className="size-[74px] rounded-2xl bg-btnprimary shadow-[0px_4.6px_0px_rgba(40,118,40,1)]"
                    onPress={() => lobbyEntryValidation(item.lobbyName)}>
                    <Entypo
                      name="controller-play"
                      size={52}
                      color="white"
                      style={{ margin: 'auto' }}
                    />
                  </Pressable>
                </Link>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListEmptyComponent={<WaitingScreen isLobbyScreen />}
        />
      </View>
    </View>
  );
};

export default Lobbies;
