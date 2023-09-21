import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel-v4";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/movieDb";

// SCREEN DIMENSION
var { width, height } = Dimensions.get("window");

// IMAGE CAROUSEL
export default function Trending({ data }) {
  // NAVIGATION
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-6">
      <Text className="text-white text-2xl mx-4 mb-4">Trending</Text>
      <Carousel
        autoplay={true}
        loop={true}
        autoplayDelay={1500}
        autoplayInterval={5000}
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={2}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

// MOVIE CARD
const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleClick(item);
      }}
    >
      <Image
        source={{
          uri: image500(item.poster_path),
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
