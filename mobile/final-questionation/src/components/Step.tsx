import { Button, View } from 'react-native';
import React from 'react';
import { useGameContext } from '@/hooks/GameProvider';
import WaitingScreen from './WaitingScreen';

interface StepProps {
  currentStep: { step: string; role: string };
  step: string | string[];
  children: React.ReactNode;
  changeStep: () => void;
}

const Step = ({ currentStep, step, children, changeStep }: StepProps) => {
  const { currentTurnRole, handleViewChange } = useGameContext();
  const stepToCheck = !Array.isArray(step) ? [step] : step;

  // ensures that the other steps don't render
  if (!stepToCheck.includes(currentStep.step)) return null;

  // checks that once on the current step, is the role is appropriate for the step
  if (currentTurnRole !== currentStep.role) {
    return (
      <View>
        <WaitingScreen />
        <Button onPress={handleViewChange} title="Handle View Change" />
        <Button title="Next step" onPress={changeStep} />
      </View>
    );
  }

  // otherwise your content is rendered
  return (
    <View>
      {children}
      <Button title="Next step" onPress={changeStep} />
    </View>
  );
};

export default Step;
