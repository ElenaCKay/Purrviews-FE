import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Animated from "react-native-reanimated";
import { SlideInDown } from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignInScreen = ({ setSignUp, LottieRef }) => {
	const [err, setErr] = useState("");
	const [value, setValue] = useState({
		email: "",
		password: "",
	});

	function signIn() {
		SecureStore.setItemAsync("email", value.email);
		SecureStore.setItemAsync("password", value.password);
		signInWithEmailAndPassword(auth, value.email, value.password).catch((err) =>
			setErr("Invalid Credentials")
		);
	}

	return (
		<Animated.View
			entering={SlideInDown}
			tw="w-full absolute bottom-0 border-y-2 border-orange-400 flex-1 justify-end bg-orange-300"
		>
			{err && <Text tw="bg-red-700 text-xl text-white">{err}</Text>}
			<Text
				style={{ fontFamily: "Pacifico-Regular" }}
				tw="text-center text-5xl pt-4 text-purple-900 underline"
			>
				Sign In
			</Text>
			<Input
				tw="text-white"
				style={{ backgroundColor: "#d7945f" }}
				placeholder="Email"
				value={value.email}
				onChangeText={(text) => setValue({ ...value, email: text })}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Input
				tw="text-white bg-orange-500"
				style={{ backgroundColor: "#d7945f" }}
				placeholder="Password"
				value={value.password}
				onChangeText={(text) => setValue({ ...value, password: text })}
				secureTextEntry={true}
				leftIcon={<Icon name="key" size={16} />}
			/>
			<View tw="flex-row space-x-4">
				<TouchableOpacity
					tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => {
						LottieRef.current?.play();
						signIn();
					}}
				>
					<Text tw="text-3xl">Sign In</Text>
				</TouchableOpacity>
				<TouchableOpacity
					tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => {
						LottieRef.current?.play();
						setSignUp(true);
					}}
				>
					<Text tw="text-3xl">Sign Up</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default SignInScreen;
