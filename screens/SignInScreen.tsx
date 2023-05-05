import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthentication } from "../utils/useAuthentication";

const auth = getAuth();

const SignInScreen = ({ setSignIn }) => {
	const [err, setErr] = useState("");
	const [value, setValue] = useState({
		email: "",
		password: "",
		error: "",
	});

	async function signIn() {
		if (value.email === "" || value.password === "") {
			setValue({
				...value,
				error: "Email and password are mandatory.",
			});
			return;
		}

		signInWithEmailAndPassword(auth, value.email, value.password).catch(
			(error) => setErr(error)
		);
	}

	return (
		<View tw="flex-1 justify-end w-full bg-transparent ">
			<Text>Signin screen!</Text>

			{!!value.error && (
				<View style={styles.error}>
					<Text>{value.error}</Text>
				</View>
			)}

			<View className="w-full bg-emerald-900 ">
				<Input
					tw="text-white bg-blue-900"
					placeholder="Email"
					value={value.email}
					onChangeText={(text) => setValue({ ...value, email: text })}
					leftIcon={<Icon name="envelope" size={16} />}
				/>

				<Input
					tw="text-white bg-blue-900"
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
						onPress={() => setSignIn(false)}
					>
						<Text tw="text-2xl">Back</Text>
					</Pressable>
					<Pressable
						tw="basis-2/4 bg-white justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={signIn}
					>
						<Text tw="text-2xl">Sign In</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	error: {
		marginTop: 10,
		padding: 10,
		color: "#fff",
		backgroundColor: "#D54826FF",
	},
});

export default SignInScreen;
