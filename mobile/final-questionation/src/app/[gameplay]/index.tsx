import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import Step from '@/components/Step';
import { useGameContext } from '@/hooks/GameProvider';

const TEST_STEPS = [
  { step: 'Choose question', role: 'Curator' },
  { step: 'Create candidates list', role: 'Navigator' },
  { step: 'Rank candidates', role: 'Curator' },
];

const RoundOne = () => {
  const { handleViewChange } = useGameContext();
  const [stepIdx, setStepIdx] = useState(0);

  const changeStep = () => {
    setStepIdx((prev) => (prev < TEST_STEPS.length - 1 ? prev + 1 : prev));
  };

  return (
    <View>
      <Step step="Choose question" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <>
          <Text>{`Step ${stepIdx + 1}`}</Text>
          <Link href="/existingRoom/round-two">
            <Text>Perform your setup action as the curator</Text>
          </Link>
          <Button onPress={handleViewChange} title="Handle View Change" />
        </>
      </Step>

      <Step step="Create candidates list" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <Text>{`Step ${stepIdx + 1}`}</Text>
        <Link href="/existingRoom/round-two">
          <Text>Perform your setup action as the NAVIGATOR</Text>
        </Link>
        <Button onPress={handleViewChange} title="Handle View Change" />
      </Step>

      <Step step="Rank candidates" currentStep={TEST_STEPS[stepIdx]} changeStep={changeStep}>
        <Text>{`Step ${stepIdx + 1}`}</Text>
        <Link href="/existingRoom/round-two">
          <Text>Do the last step as the CURATOR</Text>
        </Link>
        <Button onPress={handleViewChange} title="Handle View Change" />
      </Step>
    </View>
  );
};

export default RoundOne;
