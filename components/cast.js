import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function Cast({ cast, navigation }) {
  let characterName = "Spiderman";
  let personName = "Andrew Garfield";

  return (
    <View className="my-4">
      <Text className="text-white text-2xl mx-4 mb-3">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => {
                  navigation.navigate("Person", person);
                }}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 item-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={require("../assets/cast/cast.jpg")}
                  />
                </View>
                <Text className="text-white text-sm mt-1">
                  {characterName.length > 12
                    ? characterName.slice(0, 12) + "..."
                    : characterName}
                </Text>
                <Text className="text-neutral-400 text-sm mt-1">
                  {personName.length > 12
                    ? personName.slice(0, 12) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
