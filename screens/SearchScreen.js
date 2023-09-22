import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { image185, nullImage, searchMovie } from "../api/movieDb";
import Loading from "../components/loading";

var { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  // NAVIGATION
  const navigation = useNavigation();

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovie({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) {
          setResult(data.results);
        }
      });
    } else {
      setResult([]);
      setLoading(false);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      {/* SEARCH BAR */}
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pl-4 text-base font-semibold text-white w-[80%]"
        />

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="rounded-full p-2 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* SEARCH RESULT */}
      {loading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white text-base font-semibold ml-1">
            Results ({result.length})
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {result.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    navigation.push("Movie", item);
                  }}
                >
                  <View className="space-y-2 mb-4 items-center">
                    <Image
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                      source={{
                        uri: image185(item?.poster_path) || nullImage,
                      }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            className="h-96 w-96 mt-30"
            source={require("../assets/empty.png")}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
