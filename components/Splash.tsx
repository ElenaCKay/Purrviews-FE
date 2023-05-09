import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash() {
	return (
		<View tw="h-full bg-orange-200 items-center">
			<LottieView
				tw="w-4/6 bg-orange-200 top-2"
				source={require("../assets/Lottie/75212-cat-loader.json")}
				loop
				autoPlay
			/>
			<Text tw="text-5xl text-purple-900">Loading...</Text>
		</View>
	);
}
