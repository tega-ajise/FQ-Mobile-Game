import AppText from '@/components/AppText';
import { INSTRUCTIONS } from '@/consts/config';
import React from 'react';
import { View, Dimensions, FlatList, Text } from 'react-native';

const { height } = Dimensions.get('window');

const DescriptionContent = ({ paragraphs }: { paragraphs: string[] }) => (
  <FlatList
    data={paragraphs}
    renderItem={({ item }) => <Text className="text-center text-xl text-primary">{item}</Text>}
    ItemSeparatorComponent={() => <View className="mx-0 my-4 w-full" />}
  />
);

const VerticalFlatListPagination = () => {
  const renderItem = ({ item }: { item: { step: string; data: string[] } }) => (
    <View style={{ height }} className="items-center bg-background">
      <AppText className="mb-4 text-4xl text-primary">{item.step}</AppText>
      <DescriptionContent paragraphs={item.data} />
    </View>
  );

  return (
    <FlatList
      data={INSTRUCTIONS}
      renderItem={renderItem}
      pagingEnabled={true}
      showsVerticalScrollIndicator={true}
      snapToInterval={height} // Snap to the full screen height
      decelerationRate="fast"
    />
  );
};

export default VerticalFlatListPagination;
