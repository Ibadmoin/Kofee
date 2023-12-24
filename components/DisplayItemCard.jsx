import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, {
  FadeInDown,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {storeItems} from '../constants/index';
import Loader from './loader';
export default function DisplayItemCard() {
  const [loading, setLoader] = useState(false);
  return (
    <View className="mx-4 space-y-3  pd-20">
      <Text
        style={{fontSize: hp(4)}}
        className="font-bold text-neutral-600">
        Store Items
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <View className="flex" >
          <View>
            <MasonryList
              data={storeItems}
              keyExtractor={item => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, i}) => <CardItem item={item} index={i} />}
              //   refreshing={isLoadingNext}
              //   onRefresh={() => refetch({first: ITEM_CNT})}
              onEndReachedThreshold={0.1}
              //   onEndReached={() => loadNext(ITEM_CNT)}
            />
          </View>
          <View style={{height: 200, alignItems: 'center'}} className="flex">
            <Text>No more results</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const CardItem = ({item, index}) => {
  console.log(item.image);

  const isEven = index % 2 == 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping()}>
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1 ">
        <Image
          source={item.image}
          style={{
            width: '100%',
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />

        <Text
          style={{fontSize: hp(3)}}
          className="font-bold ml-2 text-neutral-600">
          {item.name.length > 20 ? item.name.slice(0, 18) + '...' : item.name}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
