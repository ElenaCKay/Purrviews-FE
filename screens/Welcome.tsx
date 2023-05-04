import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	Pressable,
	TouchableWithoutFeedback,
	StyleSheet,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useAuthentication } from "../utils/useAuthentication";
import { useFonts } from "expo-font";
import Splash from "./Splash";
import LottieView from "lottie-react-native";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
const auth = getAuth();

const WelcomeScreen = () => {
	const { user } = useAuthentication();
	const [isSignIn, setSignIn] = useState(false);
	const [isSignUp, setSignUp] = useState(false);
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
			style={{ backgroundColor: "#f342bd", width: "100%" }}
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
			{user ? (
				<Text
					style={{ fontFamily: "Pacifico-Regular" }}
					tw="text-4xl m-16 pt-7"
				>
					Welcome {user.displayName}!
				</Text>
			) : isSignUp ? (
				<SignUpScreen
					setSignUp={setSignUp}
					setIsLoading={setIsLoading}
					isLoading={isLoading}
				/>
			) : isSignIn ? (
				<SignInScreen setSignIn={setSignIn} />
			) : (
				<View tw="flex-row bottom-20 space-x-4 absolute">
					<Pressable
						tw="basis-2/4 bg-white  justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={() => setSignIn(true)}
					>
						<Text tw="text-2xl">Sign In</Text>
					</Pressable>
					<Pressable
						tw="basis-2/4 bg-white justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={() => setSignUp(true)}
					>
						<Text tw="text-2xl">Sign Up</Text>
					</Pressable>
				</View>
			)}
			{user ? (
				<Pressable
					tw="w-2/6 h-12 bg-green-900  justify-center items-center rounded-md absolute bottom-5"
					style={{ elevation: 6 }}
					onPress={() => signOut(auth)}
				>
					<Text tw="text-3xl text-white">Sign Out</Text>
				</Pressable>
			) : (
				<Text></Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	controls: {
		flex: 1,
	},

	control: {
		marginTop: 10,
	},

	error: {
		marginTop: 10,
		padding: 10,
		color: "#fff",
		backgroundColor: "#D54826FF",
	},
});

export default WelcomeScreen;
