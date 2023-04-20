import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MapPinIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ChatBubbleLeftEllipsisIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemWithId,
  removeFromBasket,
} from "../features/basketSlice";
import BasketIcon from "../components/BasketIcon";

const AttractionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
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
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const item = useSelector((state) => selectBasketItemWithId(state, id));

  const addAttractionToBasket = () => {
    dispatch(
      addToBasket({
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
      })
    );
  };

  const removeAttractionToBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  const introductionList = [];
  for (let i = 0; i < introduction.length; i++) {
    introductionList.push(
      <View key={i} className="px-2 pb-3">
        <View>
          <Text className="text-base px-2">{introduction[i]}</Text>
        </View>
      </View>
    );
  }

  const commentList = [];
  for (let i = 0; i < comments.length; i++) {
    let commentDate = new Date(comments[i].commentDate);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      commentDate
    );
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
      commentDate
    );
    commentDate = `${mo}-${ye}`;

    commentList.push(
      <View key={i} className="p-4">
        <View className="flex-row">
          <Image
            source={{ uri: urlFor(comments[i].header).url() }}
            className="w-4 h-4 bg-gray-300 p-4"
          />
          <Text className="text-2xl font-black px-3">
            {comments[i].username}
          </Text>
          <View className="flex-row items-center space-x-1">
            <StarIcon color="green" opacity={0.5} size={22} />
            <Text className="text-base text-green-500">
              {comments[i].rating}
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-base font-bold pt-2">{comments[i].title}</Text>
          <Text className="text-base pt-2">{commentDate}</Text>
          <Text className="text-base pt-2">{comments[i].content}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <BasketIcon />
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
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{attractionName}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-base text-gray-500">
                  <Text className="text-green-500">{rating}</Text> -{" "}
                  {districtName}
                </Text>
              </View>

              <View
                className="flex-row items-center space-x-1"
                onPress={() =>
                  navigation.navigate("Location", {
                    imgUrl,
                    attractionName,
                    lat,
                    long,
                  })
                }
              >
                <MapPinIcon color="green" opacity={0.5} size={22} />
                <Text className="text-base text-gray-500">{address}</Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{description}</Text>
          </View>

          <TouchableOpacity
            onPress={
              item.length > 0 ? removeAttractionToBasket : addAttractionToBasket
            }
          >
            {item.length > 0 ? (
              <View className="flex-row items-center space-x-2 p-3 border-y border-gray-300">
                <MinusCircleIcon color="green" size={35} />
                <Text className="pl-1 flex-1 text-xl font-bold">
                  Remove from my list
                </Text>
                <ArrowRightIcon color="green" size={22} />
              </View>
            ) : (
              <View className="flex-row items-center space-x-2 p-3 border-y border-gray-300">
                <PlusCircleIcon color="green" size={35} />
                <Text className="pl-1 flex-1 text-xl font-bold">
                  Add to my list
                </Text>
                <ArrowRightIcon color="green" size={22} />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Comment", { imgUrl, commentList })
          }
        >
          <View className="flex-row items-center space-x-2 p-4 bg-white border-b border-gray-300">
            <ChatBubbleLeftEllipsisIcon color="green" size={30} />
            <Text className="px-1 flex-1 font-bold text-xl bg-white ">
              Comments
            </Text>
          </View>
        </TouchableOpacity>

        <View className="bg-white pb-8">
          <Text className="p-4 font-bold text-2xl bg-white">Introduction</Text>
          <View className="bg-white">{introductionList}</View>
        </View>
      </ScrollView>
    </>
  );
};

export default AttractionScreen;
