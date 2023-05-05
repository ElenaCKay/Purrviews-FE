import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Welcome";
import SignInScreen from "../screens/SignInScreen";
import SignOutScreen from "../screens/SignUpScreen";
import UserProfile from "../screens/UserProfile"
import Tab from "../shared/Tabs";
const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Welcome" component={Tab} />
				<Stack.Screen name="Sign In" component={SignInScreen} />
				<Stack.Screen name="Sign Up" component={SignOutScreen} />
				<Stack.Screen name="User Profile" component={UserProfile} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
