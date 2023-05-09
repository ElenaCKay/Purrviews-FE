import * as SecureStore from "expo-secure-store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const autoLogin = () =>
	Promise.all([
		SecureStore.getItemAsync("email"),
		SecureStore.getItemAsync("password"),
	])
		.then((credentials) =>
			signInWithEmailAndPassword(auth, credentials[0], credentials[1])
		)
		.catch((err) => err);
