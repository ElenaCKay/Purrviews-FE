import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocalUser = async () => {
	const username = await AsyncStorage.getItem("username");
	const description = await AsyncStorage.getItem("description");
	const avatar = await AsyncStorage.getItem("avatar");
	const cats = await AsyncStorage.getItem("cats");
	return { username, description, avatar, cats };
};
