import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = (apiUserInfo) => {
	AsyncStorage.setItem("username", apiUserInfo.username);
	AsyncStorage.setItem("description", apiUserInfo.description);
	AsyncStorage.setItem("avatar", apiUserInfo.avatar);
	// AsyncStorage.setItem("cats", JSON.stringify(apiUserInfo.cats));
};
