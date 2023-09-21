import { Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <SafeAreaView
      style={{
        height,
        width,
      }}
      className="absolute flex-row justify-center items-center z-30"
    >
      <Progress.CircleSnail
        thickness={12}
        size={150}
        color="#FB923C"
        unfilledColor="#FEFEFE"
      />
    </SafeAreaView>
  );
}
