import "./config/firebase";
import { createStackNavigator } from "@react-navigation/stack";

import RootNavigation from "./navigation";
import { NativeBaseProvider } from "native-base";

const Stack = createStackNavigator();

export default function App() {
    return (
			<NativeBaseProvider>
				<RootNavigation />
			</NativeBaseProvider>
		);
}
