import React, { useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { useAuthentication } from "../utils/useAuthentication";
import { Button } from "react-native-elements";
import { signOut, getAuth } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/Welcome";
import UserScreen from "../screens/User";
import Map from "../screens/Map";
import UsersList from "../screens/UsersList";
import LostAndFound from "../screens/LostandFound";
import LottieView from "lottie-react-native";

const Tab = createBottomTabNavigator();

const auth = getAuth();

export default function Tabs() {
	const { user } = useAuthentication();
	const LottieRef = useRef(null);

	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen
				name="Home"
				component={WelcomeScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 45, height: 45 }}
								source={require("../assets/catlogo.png")}
							/>
						);
					},
					tabBarLabelStyle: {
						display: "none",
					},
				}}
			/>
			<Tab.Screen
				name="Map"
				component={Map}
				options={{
					tabBarIcon: () => {
						return (
							<LottieView
								ref={LottieRef}
								style={{ width: 65, height: 65 }}
								source={require("../assets/Lottie/47956-area-map.json")}
								autoPlay={false}
								loop={false}
							/>
						);
					},
					tabBarLabelStyle: {
						display: "none",
					},
				}}
				listeners={{ tabPress: () => LottieRef.current?.play() }}
			/>
			<Tab.Screen
				name="Lost & Found"
				component={LostAndFound}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 40, height: 40 }}
								source={require("../assets/landf.png")}
							/>
						);
					},
					tabBarLabelStyle: {
						display: "none",
					},
				}}
			/>
			<Tab.Screen
				name="Users"
				component={UsersList}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 40, height: 40 }}
								source={require("../assets/play-with-pet.png")}
							/>
						);
					},
					tabBarLabelStyle: {
						display: "none",
					},
				}}
			/>
			<Tab.Screen
				name="My Profile"
				component={UserScreen}
				options={{
					tabBarIcon: () => {
						return (
							<LottieView
								style={{ width: 65, height: 65 }}
								source={require("../assets/Lottie/112657-user.json")}
							/>
						);
					},
					tabBarLabelStyle: {
						display: "none",
					},
				}}
			/>
		</Tab.Navigator>
	);
}
