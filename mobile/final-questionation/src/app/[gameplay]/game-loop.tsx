import { View, FlatList, Pressable, GestureResponderEvent } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import AppTextInput from '@/components/AppTextInput';
import { useGameContext } from '@/hooks/GameProvider';
import NavigatorGameItem from '@/components/setup/NavigatorGameItem';
import { shuffle } from '@/utils/arrShuffling';
import AppText from '@/components/AppText';
import { bgMapping } from '@/consts/theme';

const RoundDeetsGoHere = () => {
  // For the curator: need a button that pulls up the questions , highlighting the current question (View Questions btn)
  // For both: Submit button should index to highlighting the next question
  // For navigator: either pass in function to "cross out" list items OR handle it in <NavigatorGameItem />
  // first thing that needs to be done is copying over globalGameConfig
  const { globalGameConfig, playerRole } = useGameContext();
  const [currentRound, setCurrentRound] = useState<number>(0);

  const candidatesData =
    playerRole.current === 'navigator'
      ? shuffle(globalGameConfig?.candidates ?? [])
      : (globalGameConfig?.candidates ?? []);

  function showModal(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View className="flex-1 bg-background p-6">
      <AppTextInput
        value={globalGameConfig?.roundQuestions?.[currentRound] ?? ''}
        prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
        classes="w-[310px] h-[81px] mx-auto"
      />
      <View className="my-8 w-full border border-t-primary" />
      <FlatList
        data={candidatesData}
        renderItem={({ item, index }) => <NavigatorGameItem choiceNumber={index} key={index} />}
      />
      {playerRole.current === 'curator' && (
        <Pressable onPress={showModal} className="min-h-10 w-fit bg-btnsecondary">
          <AppText className="m-auto text-primary">View Questions</AppText>
        </Pressable>
      )}
      <Pressable
        className={`mx-auto mt-2 h-[70px] w-[240px] rounded-xl ${bgMapping.primary} overflow-visible active:shadow-none`}
        onPress={() =>
          setCurrentRound((prev) =>
            prev === (globalGameConfig?.roundQuestions ?? [])?.length - 1 ? prev : prev + 1
          )
        }>
        <View className="flex-1 flex-col justify-center">
          <View className="flex-row justify-center gap-2">
            <Feather name="check" size={24} color="white" />
            <AppText className="text-center text-4xl text-primary">Submit</AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default RoundDeetsGoHere;
