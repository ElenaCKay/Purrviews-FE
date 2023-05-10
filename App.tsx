import "./config/firebase";
import { createStackNavigator } from "@react-navigation/stack";

import RootNavigation from "./navigation";

const Stack = createStackNavigator();

export default function App() {
    return <RootNavigation />;
}
