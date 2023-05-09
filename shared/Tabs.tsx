import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/Welcome";
import UserScreen from "../screens/User";
import Map from "../screens/Map";
import Posts from "../screens/Posts";

const Tab = createBottomTabNavigator();


export default function Tabs() {
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
				}}
			/>
			<Tab.Screen
				name="Map"
				component={Map}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 65, height: 65 }}
								source={require("../assets/map.png")}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Lost & Found"
				component={Posts}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 40, height: 40 }}
								source={require("../assets/landf.png")}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="User"
				component={UserScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 40, height: 40 }}
								source={require("../assets/user.png")}
							/>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
}
