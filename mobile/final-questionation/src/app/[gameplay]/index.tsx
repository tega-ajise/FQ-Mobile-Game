import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Step from '@/components/Step';
import { useGameContext } from '@/hooks/GameProvider';

const TEST_STEPS = [
  { step: 'Choose question', role: 'Curator' },
  { step: 'Create candidates list', role: 'Navigator' },
  { step: 'Rank candidates', role: 'Curator' },
];

const RoundOne = () => {
  const router = useRouter();
  const { handleViewChange } = useGameContext();
  const [stepIdx, setStepIdx] = useState(0);

  const changeStep = () => {
    setStepIdx((prev) => {
      if (prev < TEST_STEPS.length - 1) {
        return prev + 1;
      }
      router.navigate('/existingRoom/game-loop');
      return prev;
    });
  };

  return (
    <View>
      <Step step="Choose question" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <>
          <Text>{`Step ${stepIdx + 1}`}</Text>
          <Text>Perform your setup action as the curator</Text>
          <Button onPress={handleViewChange} title="Handle View Change" />
        </>
      </Step>

      <Step step="Create candidates list" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <Text>{`Step ${stepIdx + 1}`}</Text>
        <Text>Perform your setup action as the NAVIGATOR</Text>
        <Button onPress={handleViewChange} title="Handle View Change" />
      </Step>

      <Step step="Rank candidates" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <Text>{`Step ${stepIdx + 1}`}</Text>
        <Text>Do the last step as the CURATOR</Text>
        <Button onPress={handleViewChange} title="Handle View Change" />
      </Step>
    </View>
  );
};

export default RoundOne;
