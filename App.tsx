import "./config/firebase";
import RootNavigation from "./navigation";
import { socket } from "./utils/contexts/socket";
import { SocketContext } from "./utils/contexts/socket";

export default function App() {
	return (<SocketContext.Provider value={{socket}}>
		<RootNavigation></RootNavigation>
	</SocketContext.Provider>
	);
}
