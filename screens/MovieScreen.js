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
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimiliar,
  image500,
  nullImage,
} from "../api/movieDb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [detail, setDetail] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [favorite, setFavourite] = useState(false);
  const [loading, setLoading] = useState(true);

  // NAVIGATION
  const navigation = useNavigation();

  const getMovieDetail = async (id) => {
    const data = await fetchMovieDetails(id);

    if (data) {
      setDetail(data);
      setLoading(false);
    }
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);

    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilarMovie = async (id) => {
    const data = await fetchMovieSimiliar(id);

    if (data && data.results) {
      setSimilar(data.results);
    }
  };

  useEffect(() => {
    getMovieDetail(item.id);
    getMovieCredits(item.id);
    getSimilarMovie(item.id);
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
              uri: image500(item?.poster_path) || nullImage,
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
        <Text className="text-white text-4xl mx-4 font-bold text-center tracking-wide">
          {item?.title}
        </Text>

        {/* STATUS */}
        {!loading && (
          <Text className="text-neutral-400 text-center text-lg font-semibold">
            {detail?.status} ꞏ {detail?.release_date?.split("-")[0]} ꞏ{" "}
            {detail?.runtime + " min"}
          </Text>
        )}

        {/* GENRE */}
        <View className="flex-row justify-center mx-4 space-x-1 items-center">
          {detail?.genres?.map((genre, index) => {
            let showDot = index + 1 != detail.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 text-center text-lg font-semibold"
              >
                {genre?.name} {showDot ? "ꞏ" : null}
              </Text>
            );
          })}
        </View>

        {/* DESCRIPTION */}
        <Text className="text-neutral-400 mx-4 tracking-wide text-justify">
          {item.overview}
        </Text>
      </View>

      {/* CAST */}
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

      {/* SIMILIAR MOVIES */}
      {similar.length > 0 && cast.length > 0 && (
        <MovieList title="Similar Movies" data={similar} hideSeeAll={true} />
      )}
    </ScrollView>
  );
}
