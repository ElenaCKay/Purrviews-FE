import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default signOutLocal = () => {
	AsyncStorage.removeItem("username");
	AsyncStorage.removeItem("description");
	AsyncStorage.removeItem("avatar");
	// AsyncStorage.removeItem("cats");
	SecureStore.deleteItemAsync("email");
	SecureStore.deleteItemAsync("password");
};
