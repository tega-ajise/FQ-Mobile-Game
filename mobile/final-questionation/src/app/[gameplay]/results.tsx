import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useAppContext } from '@/hooks/AppProvider';
import AppTextInput from '@/components/AppTextInput';
import AppText from '@/components/AppText';
import NavigatorGameItem from '@/components/setup/NavigatorGameItem';
import { useGameContext } from '@/hooks/GameProvider';
import { shuffle } from '@/utils/arrShuffling';
import { GameLoopState } from '@/types/types';

const Results = () => {
  const { gameState } = useAppContext();
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
    </View>
  );
};

export default Results;
