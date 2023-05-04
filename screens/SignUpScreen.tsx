import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import Splash from "./Splash";

const SignUpScreen = ({ setSignUp, setIsLoading, isLoading }) => {
	const auth = getAuth();
	const [value, setValue] = React.useState({
		email: "",
		password: "",
		error: "",
	});
	const [profile, setProfile] = React.useState({
		displayName: "",
		photoURL: "",
	});

function signUp() {
	setIsLoading(true);
	if (value.email === "" || value.password === "") {
		setValue({
			...value,
			error: "Email and password are mandatory.",
		});
		return;
	}

	return createUserWithEmailAndPassword(auth, value.email, value.password)
		.then(() => updateProfile(auth.currentUser, profile))
		.then(() => setIsLoading(false))
		.catch((error) =>
			setValue({
				...value,
				error: error.message,
			})
		);
}

	return isLoading ? (
		<Splash />
	) : (
		<View tw="flex-1 justify-end w-full bg-transparent ">
			<Text>Signup screen!</Text>

			{!!value.error && (
				<View>
					<Text>{value.error}</Text>
				</View>
			)}

			<View className="w-full bg-emerald-900 ">
				<Input
					placeholder="Username"
					value={profile.displayName}
					onChangeText={(text) => setProfile({ ...profile, displayName: text })}
					leftIcon={<Icon name="envelope" size={16} />}
				/>
				<Input
					placeholder="Email"
					value={value.email}
					onChangeText={(text) => setValue({ ...value, email: text })}
					leftIcon={<Icon name="envelope" size={16} />}
				/>
				<Input
					placeholder="Password"
					value={value.password}
					onChangeText={(text) => setValue({ ...value, password: text })}
					secureTextEntry={true}
					leftIcon={<Icon name="key" size={16} />}
				/>
				<View tw="flex-row space-x-4">
					<Pressable
						tw="basis-2/4 bg-white  justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={() => setSignUp(false)}
					>
						<Text tw="text-2xl">Back</Text>
					</Pressable>
					<Pressable
						tw="basis-2/4 bg-white justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={signUp}
					>
						<Text tw="text-2xl">Sign In</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default SignUpScreen;
