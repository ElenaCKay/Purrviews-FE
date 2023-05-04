import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash() {
	return (
		<View className="flex-1 align-middle m-0">
			<LottieView
				source={require("../assets/Lottie/75212-cat-loader.json")}
				loop
				autoPlay
			/>
		</View>
	);
}
