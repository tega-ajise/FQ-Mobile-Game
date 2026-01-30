import { Button, Pressable, View, Dimensions } from 'react-native';
import React from 'react';
import { useGameContext } from '@/hooks/GameProvider';
import WaitingScreen from './WaitingScreen';
import { bgMapping } from '@/consts/theme';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';

interface StepProps {
  currentStep: { step: string; role: string };
  step: string | string[];
  children: React.ReactNode;
  changeStep: () => void;
}

const Step = ({ currentStep, step, children, changeStep }: StepProps) => {
  const screenHeight = Dimensions.get('window').height;

  const { playerRole } = useGameContext();
  const stepToCheck = !Array.isArray(step) ? [step] : step;

  // ensures that the other steps don't render
  if (!stepToCheck.includes(currentStep.step)) return null;

  // checks that once on the current step, is the role is appropriate for the step
  if (playerRole.current !== currentStep.role) {
    return (
      <View>
        <WaitingScreen />
        <Button title="Next step" onPress={changeStep} />
      </View>
    );
  }

  // otherwise your content is rendered
  return (
    <>
      <View style={{ height: screenHeight * 0.7 }}>{children}</View>
      <Pressable
        className={`mx-auto h-[75px] w-[315px] rounded-xl ${bgMapping.primary} active:shadow-none`}
        onPress={changeStep}>
        <View className="flex-1 flex-col justify-center">
          <View className="flex-row justify-center gap-2">
            <Feather name="check" size={24} color="white" />
            <AppText className="text-center text-4xl text-primary">Submit</AppText>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default Step;
