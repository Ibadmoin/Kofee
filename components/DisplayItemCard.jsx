import React, { useEffect } from 'react';
import {View, Text, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';

import {storeItems} from "../constants/index"
import { Image } from 'react-native-svg';
export default function DisplayItemCard() {
  return (
    <View className="mx-4 space-y-3 ">
      <Text
        style={{fontSize: hp(3)}}
        className="font-semibold text-neutral-600">
        Store card
      </Text>
      <View>
        <MasonryList
          data={storeItems}
          keyExtractor={(item)=> item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => <CardItem item={item} index={i} />}
        //   refreshing={isLoadingNext}
        //   onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}
        //   onEndReached={() => loadNext(ITEM_CNT)}
        />
      </View>
    </View>
  );
}


const CardItem = ({item, index})=>{
   
    return(
        <View>
            <Pressable style={{width:"100%"}}  className="flex justify-center mb-4 space-y-1">
            {/* <Image source={require(item.image)} /> */}

            <Text>{item.name}</Text>

            </Pressable>
        </View>

    )
}
