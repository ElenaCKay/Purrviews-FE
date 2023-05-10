import "./config/firebase";
import Tab from "./shared/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/Welcome";
import { useAuthentication } from "./utils/useAuthentication";

const Stack = createStackNavigator();

export default function App() {
	const { user } = useAuthentication();

	return (
		<NavigationContainer>
			{!user ? (
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
				</Stack.Navigator>
			) : (
				<Tab />
			)}
		</NavigationContainer>
	);
}
