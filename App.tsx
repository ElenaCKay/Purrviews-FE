import "./config/firebase";
import Tab from "./shared/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/Welcome";
import { useAuthentication } from "./utils/useAuthentication";
import { io } from "socket.io-client";

const socket = io('http://localhost:9090', {autoConnect: true});
const Stack = createStackNavigator();

export default function App() {
	const { user } = useAuthentication();

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{!user ? (
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
				) : (
					<Stack.Screen name="Welcome" component={Tab} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
