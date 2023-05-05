import React, { useEffect, useState } from "react";
import "./config/firebase";
import Tab from "./shared/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/Welcome";
import { useAuthentication } from "./utils/useAuthentication";
import * as SplashScreen from "expo-splash-screen";
import { getUser } from "./api";

SplashScreen.hideAsync();
const Stack = createStackNavigator();

export default function App() {
	const { user } = useAuthentication();
	const [userApi, setUserApi] = useState({
		_id: "",
		username: "",
		description: "",
		avatar: "",
		cats: [],
	});
	console.log(Object.keys(userApi));
	useEffect(() => {
		if (user)
			getUser(user.displayName).then(({ data }) => setUserApi(data.users));
	}, [user]);
	return !userApi.username ? (
		<WelcomeScreen userApi={userApi} />
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
