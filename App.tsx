import React, { useEffect, useState } from "react";
import "./config/firebase";
import RootNavigation from "./navigation";
import { View } from "react-native";
import Tab from "./shared/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import WelcomeScreen from "./screens/Welcome";
import { useAuthentication } from "./utils/useAuthentication";
const Stack = createStackNavigator();

export default function App() {
	const { user } = useAuthentication();
	return !user ? (
		<WelcomeScreen />
	) : (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Welcome" component={Tab} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
