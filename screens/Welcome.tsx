import React, { useState, useRef, useEffect } from "react";
import { Text, View, Pressable, TouchableWithoutFeedback } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useAuthentication } from "../utils/useAuthentication";
import { useFonts } from "expo-font";
import Splash from "./Splash";
import LottieView from "lottie-react-native";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

const auth = getAuth();

const WelcomeScreen = ({ userApi }) => {
	const { user } = useAuthentication();
	const [isSignIn, setSignIn] = useState(false);
	const [isSignUp, setSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [fontsLoaded] = useFonts({
		"Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
	});
	const LottieRef = useRef(null);

	useEffect(() => {
		LottieRef.current.play();
		if (fontsLoaded) {
			setIsLoading(false);
		}
	}, [fontsLoaded, user]);
	console.log(userApi);

	return isLoading ? (
		<Splash />
	) : (
		<View
			className="items-center flex-1 h-full"
			style={{ backgroundColor: "#a25412", width: "100%" }}
		>
			<Text
				style={{ fontFamily: "Pacifico-Regular" }}
				tw="text-6xl mt-4 -mb-9 pt-7 border-black border-2 z-10"
			>
				Purrviews
			</Text>
			<TouchableWithoutFeedback
				onPress={() => {
					LottieRef.current.play();
				}}
			>
				<LottieView
					tw="w-5/6"
					ref={LottieRef}
					source={require("../assets/Lottie/75212-cat-loader.json")}
					loop={false}
					autoPlay
				/>
			</TouchableWithoutFeedback>
			{user ? (
				<Text
					style={{ fontFamily: "Pacifico-Regular" }}
					tw="text-4xl m-16 pt-7"
				>
					Welcome {user.displayName}!
				</Text>
			) : isSignUp ? (
				<Animated.View entering={SlideInDown} tw="w-full absolute h-full">
					<SignUpScreen
						setSignUp={setSignUp}
						setIsLoading={setIsLoading}
						isLoading={isLoading}
					/>
				</Animated.View>
			) : isSignIn ? (
				<SignInScreen setSignIn={setSignIn} />
			) : (
				<View tw="flex-row space-x-4 absolute bottom-0">
					<Pressable
						tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={() => setSignIn(true)}
					>
						<Text tw="text-3xl">Sign In</Text>
					</Pressable>
					<Pressable
						tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={() => setSignUp(true)}
					>
						<Text tw="text-3xl">Sign Up</Text>
					</Pressable>
				</View>
			)}
			{user ? (
				<Pressable
					tw="w-2/6 h-12 bg-white justify-center items-center rounded-md absolute bottom-2"
					style={{ elevation: 6 }}
					onPress={() => signOut(auth)}
				>
					<Text tw="text-3xl">Sign Out</Text>
				</Pressable>
			) : (
				""
			)}
		</View>
	);
};



export default WelcomeScreen;
