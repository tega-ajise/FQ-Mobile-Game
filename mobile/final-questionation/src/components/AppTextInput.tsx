import { View, TextInput } from 'react-native';
import React from 'react';

const AppTextInput = ({
  prefixIcon,
  classes,
}: {
  prefixIcon?: () => React.ReactNode;
  classes: string;
}) => {
  return (
    <View className={`flex-row rounded-[10px] border-[3px] border-outline ${classes}`}>
      {prefixIcon && (
        <View className="flex items-center justify-center rounded-s-[10px] bg-[#382211] p-6">
          {prefixIcon()}
        </View>
      )}
      <TextInput className="flex-1 rounded-[10px] bg-black p-4 text-3xl font-bold text-primary" />
    </View>
  );
};

export default AppTextInput;
