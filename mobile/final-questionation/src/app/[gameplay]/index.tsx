import { View, Text, Button, Pressable, ScrollView } from 'react-native';
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
  const { handleViewChange, globalGameConfig } = useGameContext();
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

  return (
    <ScrollView className="flex-1 bg-background p-2">
      <Step step="Choose question" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <>
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
          <View className="my-4 w-full border-t border-primary" />
          {globalGameConfig?.roundQuestions?.map((_, idx) => (
            <SetupListItems key={idx} currentStep={stepIdx} currentRound={idx} />
          ))}
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
    </ScrollView>
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
          <AppText className="text-2xl text-secondary">Round 1/5</AppText>
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
