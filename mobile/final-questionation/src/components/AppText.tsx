import { Text, TextProps } from 'react-native';

export default function AppText(props: TextProps) {
  const { children, ...remainingProps } = props;

  return (
    <Text
      style={{
        fontFamily: 'LuckiestGuy_400Regular',
      }}
      {...remainingProps}>
      {children}
    </Text>
  );
}
