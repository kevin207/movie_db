import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// ICONS
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

// COMPONENTS
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import { image500 } from "../api/movieDb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similiar, setSimiliar] = useState([1, 2, 3, 4, 5]);
  const [favorite, setFavourite] = useState(false);

  let movieName = "Spiderman 2: Coming Home";

  // NAVIGATION
  const navigation = useNavigation();

  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <ScrollView className="bg-neutral-900 flex-1">
      {/* BACK AND MOVIE POSTER */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between item-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="rounded-xl p-1 pr-2 mt-1 bg-orange-400 flex items-center justify-center"
          >
            <ChevronLeftIcon size={20} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="p-1 mt-1"
            onPress={() => {
              setFavourite(!favorite);
            }}
          >
            <HeartIcon
              size={30}
              strokeWidth={2.5}
              color={favorite ? "red" : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Image
            source={{
              uri: image500(item.poster_path) || nullImage,
            }}
            style={{
              width: width,
              height: height * 0.6,
            }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{
              width,
              height: height * 0.4,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      {/* MOVIE DETAILS */}
      <View
        style={{
          marginTop: -(height * 0.09),
        }}
        className="space-y-3"
      >
        {/* TITLE */}
        <Text className="text-white text-4xl font-bold text-center tracking-wide">
          {item.title}
        </Text>

        {/* STATUS */}
        <Text className="text-neutral-400 text-center text-lg font-semibold">
          Released ꞏ 2020 ꞏ 120min
        </Text>

        {/* GENRE */}
        <View className="flex-row justify-center mx-4 space-x-1 items-center">
          <Text className="text-neutral-400 text-center text-lg font-semibold">
            Action ꞏ
          </Text>
          <Text className="text-neutral-400 text-center text-lg font-semibold">
            Thrill ꞏ
          </Text>
          <Text className="text-neutral-400 text-center text-lg font-semibold">
            Horror
          </Text>
        </View>

        {/* DESCRIPTION */}
        <Text className="text-neutral-400 mx-4 tracking-wide text-justify">
          Peter Parker is an outcast high schooler abandoned by his parents as a
          boy, leaving him to be raised by his Uncle Ben and Aunt May. Like most
          teenagers, Peter is trying to figure out who he is and how he got to
          be the person he is today. As Peter discovers a mysterious briefcase
          that belonged to his father, he begins a quest to understand his
          parents' disappearance – leading him directly to Oscorp and the lab of
          Dr. Curt Connors, his father's former partner. As Spider-Man is set on
          a collision course with Connors' alter ego, The Lizard, Peter will
          make life-altering choices to use his powers and shape his destiny to
          become a hero.
        </Text>
      </View>

      {/* CAST */}
      <Cast cast={cast} navigation={navigation} />

      {/* SIMILIAR MOVIES */}
      {/* <MovieList title="Similiar Movies" data={similiar} hideSeeAll={true} /> */}
    </ScrollView>
  );
}
