import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

// COMPONENTS
import Trending from "../components/trending";
import MovieList from "../components/movieList";
import Loading from "../components/loading";

// ICON
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

// API CALL
import { fetchTopRated, fetchTrending, fetchUpcoming } from "../api/movieDb";

const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  // NAVIGATION
  const navigation = useNavigation();

  // GET MOVIES DATA
  const getTrending = async () => {
    const data = await fetchTrending();

    if (data && data.results) {
      setTrending(data.results);
      setLoading(false);
    }
  };
  const getUpcoming = async () => {
    const data = await fetchUpcoming();

    if (data && data.results) {
      setUpcoming(data.results);
    }
  };
  const getTopRated = async () => {
    const data = await fetchTopRated();

    if (data && data.results) {
      setTop(data.results);
    }
  };

  useEffect(() => {
    getTrending();
    getUpcoming();
    getTopRated();
  }, []);

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />

        {/* TOP CONTENT */}
        <View className="flex-row justify-between items-center mx-4 mt-4 mb-6">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-4xl font-bold">
            <Text className="text-orange-400">Mo</Text>
            <Text className="text-white">vies</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>

        {/* MAIN CONTENT */}
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            {/* TRENDING MOVIES */}
            {trending.length > 0 && <Trending data={trending} />}

            {/* UPCOMING MOVIE */}
            <MovieList title="Upcoming" data={upcoming} />

            {/* TOP MOVIE */}
            <MovieList title="Top Rated" data={top} />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}
