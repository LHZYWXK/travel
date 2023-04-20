import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import sanityClient, { urlFor } from "../sanity";
import { useLayoutEffect } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import AttractionCard from "../components/AttractionCard";

const DistrictScreen = () => {
  const [attractions, setAttractions] = useState([]);
  const navigation = useNavigation();
  const {
    params: { _id, image, name },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getAttractions = async () => {
      const result = await sanityClient.fetch(
        `*[_type == "attraction" && district->_id == $id]{...,district->{...,}}
      `,
        { id: _id }
      );
      setAttractions(result);
    };
    getAttractions();
  }, []);

  console.log("attractions", attractions);
  return (
    <View>
      <View className="relative">
        <Image
          source={{ uri: urlFor(image).url() }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white px-4 pt-4">
        <Text className="text-3xl font-bold mb-4">{name}</Text>
      </View>
      <ScrollView
        vertical
        contentContainerStyle={{
          paddingVertical: 15,
          paddingHorizontal: 45,
        }}
        showsVerticalScrollIndicator={false}
        className="pt-4"
      >
        {attractions.map(
          ({
            _id,
            image,
            name,
            rating,
            district,
            address,
            short_description,
            long,
            lat,
            introduction,
          }) => (
            <AttractionCard
              key={_id}
              id={_id}
              imgUrl={image}
              title={name}
              rating={rating}
              genre={district?.name}
              address={address}
              short_description={short_description}
              long={long}
              lat={lat}
              introduction={introduction}
            />
          )
        )}
      </ScrollView>
    </View>
  );
};

export default DistrictScreen;
