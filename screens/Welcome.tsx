import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useCallback } from "react";
import { Text, View, Image, Animated, PanResponder } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { img } from "../assets/catlogo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
	const [fontsLoaded] = useFonts({
		"Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
	});

	const pan = useRef(new Animated.ValueXY()).current;
	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
				useNativeDriver: false,
			}),
			onPanResponderRelease: () => {
				Animated.spring(pan, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: true,
				}).start();
			},
		})
	).current;

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<View onLayout={onLayoutRootView} className="items-center flex-1">
			<Text
				style={{ fontFamily: "Pacifico-Regular" }}
				className="text-5xl m-16 pt-7"
			>
				Purrviews
			</Text>
			<Animated.View
				style={{
					transform: [{ translateX: pan.x }, { translateY: pan.y }],
				}}
				{...panResponder.panHandlers}
			>
				<Image className="h-40 w-40" source={{ uri: img }} />
			</Animated.View>

			<View className="flex-row m-16">
				<Button
					className="basis-2/4"
					title="Sign in"
					onPress={() => navigation.navigate("Sign In")}
				/>
				<Button
					className="m-8 basis-2/4"
					title="Sign up"
					type="outline"
					onPress={() => navigation.navigate("Sign Up")}
				/>
			</View>
		</View>
	);
};

export default WelcomeScreen;
