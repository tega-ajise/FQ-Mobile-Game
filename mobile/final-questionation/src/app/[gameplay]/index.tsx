import { View, Text, Button, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Step from '@/components/Step';
import { useGameContext } from '@/hooks/GameProvider';
import AppTextInput from '@/components/AppTextInput';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { bgMapping } from '@/consts/theme';
import AppText from '@/components/AppText';
import CuratorGameItem from '@/components/CuratorGameItem';

const TEST_STEPS = [
  { step: 'Choose question', role: 'curator' },
  { step: 'Create candidates list', role: 'navigator' },
  { step: 'Rank candidates', role: 'curator' },
];

const RoundOne = () => {
  const router = useRouter();
  const { handleViewChange, globalGameConfig, setupCounts, updateGameConfig } = useGameContext();
  const [stepIdx, setStepIdx] = useState(0);

  const changeStep = () => {
    setStepIdx((prev) => {
      if (prev < TEST_STEPS.length - 1) {
        return prev + 1;
      }
      router.navigate(`/${globalGameConfig.lobbyName}/game-loop`);
      return prev;
    });
  };

  const [stagedListItem, setStagedListItem] = useState<string>('');

  // return (
  //   <FlatList
  //     data={Array.from({ length: 300 }).map((_, idx) => `The item number ${idx}`)}
  //     renderItem={({ item }) => <Text className="text-center text-2xl">{item}</Text>}
  //   />
  // );

  return (
    <View className="size-full bg-background p-2">
      <Step step="Choose question" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <>
          {(globalGameConfig.roundQuestions ?? []).length <= setupCounts.numberOfQuestions && (
            <View className="relative mr-16 flex flex-col items-end gap-2">
              <AppTextInput
                onChangeText={(txt) => setStagedListItem(txt)}
                value={stagedListItem}
                prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
                classes="w-[310px] h-[81px]"
              />
              <AppText className="text-2xl text-secondary">{`Round ${globalGameConfig.roundQuestions?.length ?? 0}/${setupCounts.numberOfQuestions}`}</AppText>
              <View className="absolute -right-[55px] top-[17%]">
                <Pressable
                  className={`h-[40px] w-[40px] rounded-full ${bgMapping.primary} active:shadow-none`}
                  onPress={() => {
                    const currentQuestions = globalGameConfig.roundQuestions ?? [];
                    const newQuestions = [...currentQuestions, stagedListItem];
                    updateGameConfig({ roundQuestions: newQuestions });
                    setStagedListItem('');
                  }}>
                  <Feather name="check" size={24} color="white" style={{ margin: 'auto' }} />
                </Pressable>
              </View>
            </View>
          )}
          <View className="my-4 w-full border-t border-primary" />
          <FlatList
            data={globalGameConfig.roundQuestions ?? []}
            keyExtractor={(_, index) => `round-$${index}`}
            renderItem={({ index }) => (
              <SetupListItems currentStep={stepIdx} currentRound={index} />
            )}
            style={{ marginBottom: 'auto' }}
          />
        </>
      </Step>

      <Step step="Create candidates list" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <Text>{`Step ${stepIdx + 1}`}</Text>
        <Text>Perform your setup action as the NAVIGATOR</Text>
      </Step>

      <Step step="Rank candidates" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <Text>{`Step ${stepIdx + 1}`}</Text>
        <Text>Do the last step as the CURATOR</Text>
      </Step>
      <Button onPress={handleViewChange} title="Handle View Change" />
    </View>
  );
};

const SetupListItems = ({
  currentStep,
  currentRound,
}: {
  currentStep: number;
  currentRound: number;
}) => {
  switch (currentStep) {
    case 0:
      return <CuratorGameItem currentRound={currentRound} isSetup />;
    case 1:
      return (
        <View className="relative mr-16 flex flex-col items-end gap-2">
          <AppTextInput
            prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
            classes="w-[310px] h-[81px]"
          />
          <AppText className="text-2xl text-secondary">{`Round 1/5`}</AppText>
          {/** make sure to change the round 1/5 here and in case 2 as well */}
          <View className="absolute -right-[55px] top-[17%]">
            <Pressable
              className={`h-[40px] w-[40px] rounded-full ${bgMapping.primary} active:shadow-none`}>
              <Feather name="check" size={24} color="white" style={{ margin: 'auto' }} />
            </Pressable>
          </View>
        </View>
      );
    case 2:
      return (
        <View className="relative mr-16 flex flex-col items-end gap-2">
          <AppTextInput
            prefixIcon={() => <FontAwesome5 name="question" size={24} color="white" />}
            classes="w-[310px] h-[81px]"
          />
          <AppText className="text-2xl text-secondary">Round 1/5</AppText>
          <View className="absolute -right-[55px] top-[17%]">
            <Pressable
              className={`h-[40px] w-[40px] rounded-full ${bgMapping.primary} active:shadow-none`}>
              <Feather name="check" size={24} color="white" style={{ margin: 'auto' }} />
            </Pressable>
          </View>
        </View>
      );
    default:
      break;
  }
};

export default RoundOne;
