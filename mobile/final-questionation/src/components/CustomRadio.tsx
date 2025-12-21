import { View, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import AppText from './AppText';

type RadioProps = {
  options: { label: string; value: string }[];
  checkedValue: 'navigator' | 'curator';
  onChange: (value: string) => void;
};

const CustomRadio: FC<RadioProps> = ({ options, checkedValue, onChange }) => {
  return (
    <View className="my-4 flex-row justify-around">
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          className={`rounded-full border-[3px] border-primary px-8 py-4 ${checkedValue === option.value && 'bg-btnsecondary'}`}
          onPress={() => onChange(option.value)}>
          <AppText className="text-xl text-primary">{option.label}</AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomRadio;
