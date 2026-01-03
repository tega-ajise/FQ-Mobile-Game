import { View, TextInput, TextInputProps } from 'react-native';
import React from 'react';

const AppTextInput = ({
  prefixIcon,
  classes,
  textClasses,
  ...textProps
}: {
  prefixIcon?: () => React.ReactNode;
  classes: string;
  textClasses?: string;
} & TextInputProps) => {
  return (
    <View className={`flex-row rounded-[10px] border-[3px] border-outline ${classes}`}>
      {prefixIcon && (
        <View className="flex h-full w-1/6 items-center justify-center rounded-s-[7px] bg-[#382211]">
          {prefixIcon()}
        </View>
      )}
      <TextInput
        className={`flex-1 bg-black p-4 font-bold text-primary ${prefixIcon ? 'rounded-e-[7px]' : 'rounded-[7px]'} ${textClasses || 'text-3xl'}`}
        {...textProps}
      />
    </View>
  );
};

export default AppTextInput;
