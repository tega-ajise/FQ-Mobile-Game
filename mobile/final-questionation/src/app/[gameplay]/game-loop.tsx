import { View, FlatList, Pressable, GestureResponderEvent } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import AppTextInput from '@/components/AppTextInput';
import { useGameContext } from '@/hooks/GameProvider';
import NavigatorGameItem from '@/components/setup/NavigatorGameItem';
import { shuffle } from '@/utils/arrShuffling';
import AppText from '@/components/AppText';
import { bgMapping } from '@/consts/theme';
import { useAppContext } from '@/hooks/AppProvider';
import { GameLoopState } from '@/types/types';
import { Redirect } from 'expo-router';

const RoundDeetsGoHere = () => {
  // For the curator: need a button that pulls up the questions , highlighting the current question (View Questions btn)
  // For both: Submit button should index to highlighting the next question
  // For navigator: either pass in function to "cross out" list items OR handle it in <NavigatorGameItem />
  // first thing that needs to be done is copying over globalGameConfig
  const { playerRole } = useGameContext();
  const { gameState, socket } = useAppContext();
  const crossedItemState = useState<string | undefined>(undefined);

  const currentRound = gameState?.stepIdx ?? 0;

  const candidatesData = useMemo(
    () =>
      playerRole.current === 'navigator'
        ? shuffle((gameState as GameLoopState)?.candidates)
        : ((gameState as GameLoopState)?.candidates ?? []),
    [gameState, playerRole]
  );

  function showModal(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }
  // MEANS WE MOVE ON TO FINAL QUESTIONATION
  if (currentRound === (gameState?.roundQuestions ?? [])?.length - 1) {
    return <Redirect href={`/${gameState?.lobbyName}/results`} />;
  }

  return (
    <View className="flex-1 bg-background p-6">
      <AppTextInput
        value={gameState?.roundQuestions?.[currentRound] ?? ''}
        prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
        classes="w-[310px] h-[81px] mx-auto"
      />
      <View className="my-8 w-full border border-t-primary" />
      <FlatList
        data={candidatesData}
        keyExtractor={(_, idx) => `Order-Number-${idx}`}
        renderItem={({ item, index }) => (
          <NavigatorGameItem
            choiceNumber={index}
            key={index}
            val={item.content}
            crossedItemState={crossedItemState}
          />
        )}
      />
      <Pressable
        className={`mx-auto mt-2 h-[70px] w-[240px] rounded-xl ${playerRole.current === 'navigator' ? bgMapping.primary : bgMapping.secondary} overflow-visible active:shadow-none`}
        onPress={
          playerRole.current === 'navigator'
            ? () => {
                socket?.emit('eliminateItem', {
                  lobbyName: gameState?.lobbyName,
                  value: crossedItemState[0],
                });
              }
            : showModal
        }>
        <View className="flex-1 flex-col justify-center">
          <View className="flex-row justify-center gap-2">
            {playerRole.current === 'navigator' && <Feather name="check" size={24} color="white" />}
            <AppText
              className={`text-center text-primary ${playerRole.current === 'navigator' ? 'text-4xl' : 'text-2xl'}`}>
              {playerRole.current === 'navigator' ? 'Submit' : 'View Questions'}
            </AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default RoundDeetsGoHere;
