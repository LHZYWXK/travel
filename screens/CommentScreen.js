import { View, Image, TouchableOpacity, ScrollView } from "react-native";

import { useLayoutEffect } from "react";
import { urlFor } from "../sanity";

import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const CommentScreen = () => {
  const navigation = useNavigation();
  const {
    params: { imgUrl, commentList },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white pb-36">{commentList}</View>
    </ScrollView>
  );
};

export default CommentScreen;
