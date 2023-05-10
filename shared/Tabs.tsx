import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { getAuth } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/Welcome";
import UserScreen from "../screens/User";
import Map from "../screens/Map";
import UsersList from "../screens/UsersList";
import LostAndFound from "../screens/LostandFound";
import { getLocalUser } from "../utils/hooks/getLocalUser";

const Tab = createBottomTabNavigator();

const auth = getAuth();

export default function Tabs() {
	const user = auth.currentUser;
	const [localUser, setLocalUser] = useState({
		avatar: "./assets/pet-care.png",
	});

	useEffect(() => {
		user &&
			getLocalUser().then((local) =>
				setLocalUser({ ...localUser, avatar: local.avatar })
			);
	}, []);
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveBackgroundColor: "purple",
				tabBarStyle: { backgroundColor: "#d7945f" },
			}}
		>
			<Tab.Screen
				name="Home"
				component={WelcomeScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 45, height: 45 }}
								source={require("../assets/animal-shelter.png")}
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
							<Image
								tw="p-4"
								style={{ width: 50, height: 50 }}
								source={require("../assets/pawlocations.png")}
							/>
						);
					},
					tabBarLabelStyle: {
						display: "none",
					},
				}}
			/>
			<Tab.Screen
				name="Lost & Found"
				component={LostAndFound}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 50, height: 50 }}
								source={require("../assets/pawfind.png")}
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
								style={{ width: 50, height: 50 }}
								source={require("../assets/pet-care.png")}
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
							<Image
								style={{ width: 50, height: 50 }}
								source={{ uri: localUser.avatar }}
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
