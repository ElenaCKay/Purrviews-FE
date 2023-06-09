import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/Welcome";

const Stack = createStackNavigator();

export default function UserStack() {
    return (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
}
