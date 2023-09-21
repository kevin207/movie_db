import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image185, nullImage } from "../api/movieDb";

// SCREEN DIMENSION
var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  // NAVIGATION
  const navigation = useNavigation();

  return (
    <View className="mb-6 space-y-4">
      {/* TITLE & SEE ALL */}
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-2xl text-white">{title}</Text>

        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-orange-400 text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* MOVIE ROW */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                navigation.push("Movie", item);
              }}
            >
              <View className="space-y-1 mr-4 flex-col items-center">
                <Image
                  source={{
                    uri: image185(item.poster_path) || nullImage,
                  }}
                  className="rounded-3xl"
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.title.length > 18
                    ? item.title.slice(0, 18) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
