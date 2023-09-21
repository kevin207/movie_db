import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image185, nullAvatar } from "../api/movieDb";

export default function Cast({ cast, navigation }) {

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
                    source={{
                      uri: image185(person?.profile_path) || nullAvatar,
                    }}
                  />
                </View>
                <Text className="text-white text-sm mt-1">
                  {person?.character.length > 12
                    ? person?.character.slice(0, 12) + "..."
                    : person?.character}
                </Text>
                <Text className="text-neutral-400 text-sm mt-1">
                  {person?.original_name.length > 12
                    ? person?.original_name.slice(0, 12) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
