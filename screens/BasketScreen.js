import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const BasketScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate("Attraction", {
                  id: item.id,
                  attractionName: item.attractionName,
                  imgUrl: item.imgUrl,
                  rating: item.rating,
                  districtName: item.districtName,
                  address: item.address,
                  description: item.description,
                  long: item.long,
                  lat: item.lat,
                  introduction: item.introduction,
                  comments: item.comments,
                });
              }}
            >
              <View
                key={item.id}
                className="flex-row items-center space-x-3 bg-white py-2 px-5"
              >
                <Image
                  source={{ uri: urlFor(item?.imgUrl).url() }}
                  className="w-12 h-12 rounded-full"
                />
                <Text className="flex-1 text-lg">{item.attractionName}</Text>
                <TouchableOpacity>
                  <Text
                    className="text-[#00CCBB] text-lg"
                    onPress={() => {
                      dispatch(removeFromBasket({ id: item.id }));
                    }}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
