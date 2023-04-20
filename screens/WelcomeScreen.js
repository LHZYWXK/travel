import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HongKongImage } from "../assets";
// import * as Animatable from "react-native-animatable";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/* First Section */}
      <View className="flex-row px-6 mt-8 items-center space-x-2">
        <Text className="text-[#2A2B4B] text-3xl font-semibold">Travel in</Text>
        <View className="w-16 h-16 bg-red-500 items-center justify-center rounded-md">
          <Text className="text-white text-center text-xl font-bold ">HK</Text>
        </View>
      </View>

      {/* Second Section */}
      <View className="px-6 mt-8 space-y-3">
        <Text className="text-[#3C6072] text-[42px]">Discover the</Text>
        <Text className=" text-red-400 text-[38px]">Lesser-Known</Text>
        <Text className=" text-red-400 text-[38px]">Attractions</Text>
        <Text className="text-[#3C6072] text-[42px]">in Hong Kong</Text>
      </View>

      {/* Circle Section */}
      <View className="w-[400px] h-[400px] rounded-full bg-[#00BCC9] absolute bottom-20 -right-36"></View>
      <View className="w-[400px] h-[400px] rounded-full bg-[#E99265] absolute -bottom-28 -left-36"></View>

      {/* Image */}
      <View className="flex-1 relative items-center justify-center">
        <Image
          source={HongKongImage}
          className="w-full h-full object-cover mt-20"
        />
        <TouchableOpacity className="absolute bottom-24 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
          onPress={() => navigation.navigate("Main")}
        >
          <View
            className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]"
          >
            <Text className="text-gray-50 text-[36px] font-semibold">Go!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
