import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import AttractionCard from "./AttractionCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [attractions, setAttractions] = React.useState([]);

  useEffect(() => {
    const getAttractions = async () => {
      const result = await sanityClient.fetch(
        // `*[_type=="featured" && _id == $id]{...,attractions[]->{..., district->{name}}}[0]`,
        '*[_type=="featured" && _id==$id]{...,attractions[]->{...,district->{name},comments[]->{...,}}}[0]',
        { id }
      );
      console.log(result);
      setAttractions(result?.attractions);
    };
    getAttractions();
  }, []);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#527283" />
      </View>

      <Text className=" text-sm text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Attractions Cards */}
        {attractions?.map((attraction) => (
          <AttractionCard
            key={attraction._id}
            id={attraction._id}
            imgUrl={attraction.image}
            attractionName={attraction.name}
            rating={attraction.rating}
            districtName={attraction.district?.name}
            address={attraction.address}
            description={attraction.description}
            long={attraction.long}
            lat={attraction.lat}
            introduction={attraction?.introduction}
            comments={attraction?.comments}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
