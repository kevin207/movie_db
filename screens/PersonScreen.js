import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// COMPONENTS
import MovieList from "../components/movieList";

// ICONS
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-2";

export default function PersonScreen() {
  const [favorite, setFavourite] = useState(false);
  const [movie, setMovie] = useState([1, 2, 3, 4, 5]);

  // NAVIGATION
  const navigation = useNavigation();

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      {/* BACK & FAVOURITE BUTTON */}
      <SafeAreaView
        className={
          "flex-row justify-between item-center px-4 " + verticalMargin
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

      {/* PERSON DETAILS */}
      <View className="mt-2">
        {/* AVATAR */}
        <View
          className="flex-row justify-center"
          style={
            ios && {
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }
          }
        >
          <View
            className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500"
            style={
              !ios && {
                shadowColor: "white",
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 5 },
                shadowRadius: 40,
                elevation: 13,
                backgroundColor: "white",
              }
            }
          >
            <Image
              source={require("../assets/cast/cast.jpg")}
              style={{
                height: height * 0.5,
                width: width * 0.74,
              }}
            />
          </View>
        </View>

        {/* NAME & ORIGIN */}
        <View className="mt-6">
          <Text className="text-4xl text-center font-bold text-white">
            Andrew Garfield
          </Text>

          <Text className="text-lg text-center font-bold text-neutral-500">
            London, United Kingdom
          </Text>
        </View>

        {/* INFORMATION */}
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="px-2 items-center">
            <Text className="text-white font-semibold text-lg">Gender</Text>
            <Text className="text-neutral-300 font-semibold">Male</Text>
          </View>

          <View className="px-2 items-center">
            <Text className="text-white font-semibold text-lg">Birthday</Text>
            <Text className="text-neutral-300 font-semibold">1980-05-27</Text>
          </View>

          <View className="px-2 items-center">
            <Text className="text-white font-semibold text-lg">Known for</Text>
            <Text className="text-neutral-300 font-semibold">Actor</Text>
          </View>

          <View className="px-2 items-center">
            <Text className="text-white font-semibold text-lg">Popularity</Text>
            <Text className="text-neutral-300 font-semibold">87.5</Text>
          </View>
        </View>

        {/* BIOGRAPHY */}
        <View className="mx-4 space-y-2 my-6">
          <Text className="text-2xl text-white">Biography</Text>
          <Text className="text-neutral-400 tracking-wide text-justify">
            Andrew Russell Garfield (born August 20, 1983) is an English and
            American actor. He has received various accolades, including a Tony
            Award, a BAFTA TV Award and a Golden Globe Award, in addition to
            nominations for a Primetime Emmy Award, a Laurence Olivier Award and
            two Academy Awards. Time included Garfield on its list of 100 most
            influential people in the world in 2022. Born in Los Angeles and
            raised in Epsom, England, Garfield trained at the Royal Central
            School of Speech and Drama and began his career on the UK stage and
            in television productions. He made his feature film debut in the
            2007 ensemble drama Lions for Lambs. He won the BAFTA TV Award for
            Best Actor for his performance in the television film Boy A (2007).
            Garfield gained wider recognition for playing Spider-Man in the
            superhero films The Amazing Spider-Man (2012), The Amazing
            Spider-Man 2 (2014), and later in Spider-Man: No Way Home (2021). He
            received nominations for the Academy Award for Best Actor for
            starring as Desmond Doss in the war film Hacksaw Ridge (2016) and as
            Jonathan Larson in the musical Tick, Tick... Boom! (2021). Garfield
            also won a Golden Globe Award for Best Actor for the latter. In
            2022, he starred as a Mormon detective in the crime drama miniseries
            Under the Banner of Heaven, earning nominations for a Primetime Emmy
            Award and a Golden Globe Award.
          </Text>
        </View>

        {/* MOVIES */}
        <MovieList title="Movie" data={movie} hideSeeAll={true} />
      </View>
    </ScrollView>
  );
}
