import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

// COMPONENTS
import MovieList from "../components/movieList";

// ICONS
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
  nullAvatar,
} from "../api/movieDb";
import Loading from "../components/loading";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-2";

export default function PersonScreen() {
  const { params: item } = useRoute();
  const [person, setPerson] = useState({});
  const [favorite, setFavourite] = useState(false);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  // NAVIGATION
  const navigation = useNavigation();

  const getPersonDetail = async (id) => {
    const data = await fetchPersonDetails(id);

    if (data) {
      setPerson(data);
      setLoading(false);
    }
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);

    if (data && data.cast) {
      setMovie(data.cast);
    }
  };

  useEffect(() => {
    getPersonDetail(item.id);
    getPersonMovies(item.id);
  }, []);

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
      {loading ? (
        <Loading />
      ) : (
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
                source={{
                  uri: image342(person?.profile_path) || nullAvatar,
                }}
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
              {person?.name}
            </Text>

            <Text className="text-lg text-center font-bold text-neutral-500">
              {person?.place_of_birth}
            </Text>
          </View>

          {/* INFORMATION */}
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="px-2 items-center">
              <Text className="text-white font-semibold text-lg">Gender</Text>
              <Text className="text-neutral-300 font-semibold">
                {" "}
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>

            <View className="px-2 items-center">
              <Text className="text-white font-semibold text-lg">Birthday</Text>
              <Text className="text-neutral-300 font-semibold">
                {person?.birthday}
              </Text>
            </View>

            <View className="px-2 items-center">
              <Text className="text-white font-semibold text-lg">
                Known for
              </Text>
              <Text className="text-neutral-300 font-semibold">
                {person?.known_for_department}
              </Text>
            </View>

            <View className="px-2 items-center">
              <Text className="text-white font-semibold text-lg">
                Popularity
              </Text>
              <Text className="text-neutral-300 font-semibold">
                {person?.popularity.toFixed(2)} %
              </Text>
            </View>
          </View>

          {/* BIOGRAPHY */}
          <View className="mx-4 space-y-2 my-6">
            <Text className="text-2xl text-white">Biography</Text>
            <Text className="text-neutral-400 tracking-wide text-justify">
              {person?.biography || "This Person Doesn't have biography"}
            </Text>
          </View>

          {/* MOVIES */}
          <MovieList title="Movie" data={movie} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
