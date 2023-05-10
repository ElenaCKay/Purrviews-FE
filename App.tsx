import "./config/firebase";
import { createStackNavigator } from "@react-navigation/stack";
import RootNavigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import { socket } from "./utils/contexts/socket";
import { SocketContext } from "./utils/contexts/socket";

const Stack = createStackNavigator();

export default function App() {
	return (
	<SocketContext.Provider value={{socket}}>
		<NativeBaseProvider>
			<RootNavigation />
		</NativeBaseProvider>
	</SocketContext.Provider>
	);
}
