import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const AttractionCard = ({
  id,
  imgUrl,
  attractionName,
  rating,
  districtName,
  address,
  description,
  long,
  lat,
  introduction,
  comments,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Attraction", {
          id,
          imgUrl,
          attractionName,
          rating,
          districtName,
          address,
          description,
          long,
          lat,
          introduction,
          comments,
        });
      }}
      className="bg-white mr-3 shadow mb-3 flex-col"
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-full rounded-sm"
      />
      <View className="px-3 pb-4 w-64">
        <Text className="font-bold text-lg pt-2">{attractionName}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> - {districtName}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AttractionCard;
