import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { FlatList, Pressable, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useAppContext } from '@/hooks/AppProvider';
import AppTextInput from '@/components/AppTextInput';
import AppText from '@/components/AppText';
import NavigatorGameItem from '@/components/setup/NavigatorGameItem';
import { useGameContext } from '@/hooks/GameProvider';
import { shuffle } from '@/utils/arrShuffling';
import { GameLoopState } from '@/types/types';
import { bgMapping } from '@/consts/theme';
import ThemedNavigateButton from '@/components/ThemedNavigateButton';

const Results = () => {
  const { gameState, socket, resultState, isGameOver } = useAppContext();
  const { playerRole } = useGameContext();

  const [spotlightedItem, setSpotlightedItem] = useState<string>('');

  const candidatesData = useMemo(
    () =>
      playerRole.current === 'navigator'
        ? shuffle((gameState as GameLoopState)?.candidates)
        : (gameState as GameLoopState)?.candidates,
    [gameState, playerRole]
  );

  const FINAL_ROUND = gameState?.stepIdx ?? (gameState?.roundQuestions ?? []).length - 1; // this value should be the last index of the round questions (3 in my test examples)

  if (isGameOver)
    return (
      <View className="flex-1 bg-background p-6">
        <View className="mx-auto flex flex-col items-end gap-2">
          <AppTextInput
            value={gameState?.roundQuestions?.[FINAL_ROUND] ?? ''}
            prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
            classes="w-[310px] h-[81px] mx-auto"
          />
          <AppText className="text-2xl text-accent">Final Questionation</AppText>
        </View>
        <View className="my-4 w-full border border-t border-primary" />
        <NavigatorGameItem
          choiceNumber={resultState?.[0]?.position ?? -1}
          val={resultState?.[0]?.question}
        />
        <ThemedNavigateButton
          style="primary"
          text="Return Home"
          route="/"
          onClick={() => window.location.reload()} // just to re-render (so lobby doesn't appear on home screen anymore)
        />
      </View>
    );

  return (
    <View className="flex-1 bg-background p-6">
      <View className="mx-auto flex flex-col items-end gap-2">
        <AppTextInput
          value={gameState?.roundQuestions?.[FINAL_ROUND] ?? ''}
          prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
          classes="w-[310px] h-[81px] mx-auto"
        />
        <AppText className="text-2xl text-accent">Final Questionation</AppText>
      </View>
      <View className="my-4 w-full border border-t border-primary" />
      <FlatList
        data={candidatesData}
        keyExtractor={(_, idx) => `Order-Number-${idx}`}
        renderItem={({ item, index }) => (
          <View className={`${spotlightedItem === item.content && 'bg-accent'}`}>
            <NavigatorGameItem
              choiceNumber={index}
              key={index}
              val={item.content}
              {...(!item.isEliminated && {
                textBoxProps: { onPress: () => setSpotlightedItem(item.content) },
              })}
            />
          </View>
        )}
      />
      {playerRole.current === 'navigator' && (
        <Pressable
          className={`mx-auto mt-2 h-[70px] w-[240px] rounded-xl ${bgMapping.primary} overflow-visible active:shadow-none`}
          onPress={() => {
            socket
              ?.emitWithAck('showResults', {
                lobbyName: gameState?.lobbyName,
                value: spotlightedItem,
              })
              .then((res) => {
                if (!res.ok) throw new Error('What happened at the end blud');
              });
          }}>
          <View className="flex-1 flex-col justify-center">
            <View className="flex-row justify-center gap-2">
              <Feather name="check" size={24} color="white" />
              <AppText
                className={`text-center text-primary ${playerRole.current === 'navigator' ? 'text-4xl' : 'text-2xl'}`}>
                Submit
              </AppText>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Results;
