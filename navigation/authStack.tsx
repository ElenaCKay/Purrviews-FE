import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "../screens/UserProfile";
import Tab from "../shared/Tabs";
import Chat from "../screens/Chat";
const Stack = createStackNavigator();

export default function AuthStack() {
	return (
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
