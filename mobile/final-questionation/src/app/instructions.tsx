import AppText from '@/components/AppText';
import { INSTRUCTIONS } from '@/consts/config';
import React, { ReactElement } from 'react';
import { View, Dimensions, FlatList, Text } from 'react-native';

const { height } = Dimensions.get('window');

const DescriptionContent = ({ content }: { content: ReactElement[] }) => (
  <FlatList
    data={content}
    className="w-full"
    keyExtractor={(_, idx) => idx.toString()}
    renderItem={({ item }) => (typeof item === 'string' ? <Text>{item}</Text> : item)}
    ItemSeparatorComponent={() => <View className="mx-0 my-4 w-full" />}
  />
);

const VerticalFlatListPagination = () => {
  const renderItem = ({ item }: { item: { step: string; data: ReactElement[] } }) => (
    <View style={{ height }} className="items-center bg-background">
      <AppText className="mb-4 text-4xl text-primary">{item.step}</AppText>
      <DescriptionContent content={item.data} />
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
