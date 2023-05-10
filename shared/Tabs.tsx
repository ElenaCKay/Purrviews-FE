import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/Welcome";
import UserScreen from "../screens/User";
import Map from "../screens/Map";
import Posts from "../screens/Posts";
import UsersList from "../screens/UsersList";
import LostAndFound from "../screens/LostandFound";

const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveBackgroundColor: "#876243",
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
				name="Posts"
				component={Posts}
				options={{
					tabBarIcon: () => {
						return (
							<Image
								style={{ width: 50, height: 50 }}
								source={require("../assets/twocats.png")}
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
								style={{ width: 48, height: 48 }}
								source={require("../assets/profilegirl.png")}
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
