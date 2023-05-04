import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	Image,
	Pressable,
	TouchableWithoutFeedback,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { img } from "../assets/catlogo";
import { useFonts } from "expo-font";
import Splash from "./Splash";
import LottieView from "lottie-react-native";

const WelcomeScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [fontsLoaded] = useFonts({
		"Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
	});
	const LottieRef = useRef(null);

	useEffect(() => {
		if (fontsLoaded) {
			setIsLoading(false);
		}
	}, [fontsLoaded]);

	return isLoading ? (
		<Splash />
	) : (
		<View
			className="items-center flex-1 bg-#b18144"
			style={{ backgroundColor: "#f342bd" }}
		>
			<Text style={{ fontFamily: "Pacifico-Regular" }} tw="text-6xl m-16 pt-7">
				Purrviews
			</Text>
			<TouchableWithoutFeedback
				onPress={() => {
					LottieRef.current.play();
				}}
			>
				<LottieView
					ref={LottieRef}
					source={require("../assets/Lottie/75212-cat-loader.json")}
					loop={false}
					autoPlay
				/>
			</TouchableWithoutFeedback>
			<View tw="flex-row bottom-10 space-x-4 absolute">
				<Pressable
					tw="basis-2/4 bg-white  justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => navigation.navigate("Sign In")}
				>
					<Text tw="text-2xl">Sign In</Text>
				</Pressable>
				<Pressable
					tw="basis-2/4 bg-white justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => navigation.navigate("Sign Up")}
				>
					<Text tw="text-2xl">Sign Up</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default WelcomeScreen;
