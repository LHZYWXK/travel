import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const MainScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = React.useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getFeaturedCategories = async () => {
      const result = await sanityClient.fetch(
        '*[_type == "featured"]{..., attractions[] -> {...,}}'
      );
      console.log(result);
      setFeaturedCategories(result);
    };

    getFeaturedCategories();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* First Section */}
      <View className="flex-row items-center justify-between px-8 mb-4">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Explore</Text>
          <Text className="text-[#527283] text-[36px]">the places now!</Text>
        </View>

        <View className="w-12 h-12 rounded-md items-center justify-center shadow-lg">
          <UserIcon
            className="w-full h-full rounded-md object-cover"
            onPress={() => navigation.navigate("Basket")}
          />
        </View>
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-4">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput placeholder="Attractions" keyboardType="default" />
        </View>
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* District Categories */}
        <Categories />
        {/* Featured Attractions */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
