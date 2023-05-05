import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	Pressable,
	ImageBackground,
	TextInput,
	ScrollView,
	Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import Splash from "./Splash";
import * as ImagePicker from "expo-image-picker";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import { postUsers } from "../api";
import AddCat from "./AddCat";

const SignUpScreen = ({ setSignUp, setIsLoading, isLoading }) => {
	const [galleryPerm, setGalleryPerm] = useState(null);
	const [addCat, setAddCat] = useState(false);
	const [active, setActive] = useState(0);
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
	const [apiUserInfo, setApiUserInfo] = useState({
		username: "",
		description: "",
		avatar: catmarkers[Math.floor(Math.random() * catmarkers.length)],
		cats: [],
	});

	console.log(apiUserInfo.cats[0]);

	onchange = (nativeEvent) => {
		if (nativeEvent) {
			const slide = Math.ceil(
				nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
			);
			if (slide != active) {
				setActive(slide);
			}
		}
	};

	useEffect(() => {
		(async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setGalleryPerm(galleryStatus.status === "granted");
		})();
	}, []);

	function signUp() {
		if (value.email === "" || value.password === "") {
			setValue({
				...value,
				error: "Email and password are mandatory.",
			});
		}

		return createUserWithEmailAndPassword(auth, value.email, value.password)
			.then(() => {
				setApiUserInfo({ ...apiUserInfo, username: profile.displayName });
				updateProfile(auth.currentUser, profile);
			})
			.then(() => postUsers(apiUserInfo))
			.catch((error) =>
				setValue({
					...value,
					error: error.message,
				})
			);
	}

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
			quality: 0.4,
		});
		if (!result.canceled) {
			setApiUserInfo({
				...apiUserInfo,
				avatar: "data:image/png;base64," + result.assets[0].base64,
			});
		}
	};

	console.log(apiUserInfo.cats.length);
	if (galleryPerm === false) {
		<Text>No access to storage</Text>;
	}

	return isLoading ? (
		<Splash />
	) : (
		<View tw="flex-1">
			{!!value.error && (
				<View>
					<Text tw="text-white text-xl">test{value.error}</Text>
				</View>
			)}
			<View className=" bg-red-900 items-center h-full border-brown border-2">
				<Pressable
					tw="mt-24 bg-gray-300 rounded-3xl mb-10"
					style={{ elevation: 6 }}
					onPress={pickImage}
				>
					<ImageBackground
						tw="h-44 w-40 justify-end items-center"
						source={{ uri: apiUserInfo.avatar }}
					>
						<Text tw="text-xl text-gray-500">Upload a photo!</Text>
					</ImageBackground>
				</Pressable>
				<Input
					tw="bg-gray-300"
					placeholder="Username"
					value={profile.displayName}
					onChangeText={(text) => {
						setApiUserInfo({ ...apiUserInfo, username: text });
						setProfile({ ...profile, displayName: text });
					}}
					leftIcon={<Icon name="envelope" size={16} />}
				/>
				<Input
					tw="bg-gray-300"
					placeholder="Email"
					value={value.email}
					onChangeText={(text) => setValue({ ...value, email: text })}
					leftIcon={<Icon name="envelope" size={16} />}
				/>
				<Input
					tw="bg-gray-300"
					placeholder="Password"
					value={value.password}
					onChangeText={(text) => setValue({ ...value, password: text })}
					secureTextEntry={true}
					leftIcon={<Icon name="key" size={16} />}
				/>
				<TextInput
					tw="bg-gray-300 w-full h-20"
					placeholder="Your Description Here"
					value={apiUserInfo.description}
					onChangeText={(text) =>
						setApiUserInfo({ ...apiUserInfo, description: text })
					}
				/>
				<ScrollView
					tw="m-4"
					style={{ width: "100%", height: "100%" }}
					onScroll={({ nativeEvent }) => onchange(nativeEvent)}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					horizontal
				>
					<Pressable
						tw="h-36 mr-6 w-36 bg-gray-300 rounded-3xl justify-center items-center align-middle"
						style={{ elevation: 6 }}
						onPress={() => setAddCat(!addCat)}
					>
						<Text tw="text-5xl">+</Text>
					</Pressable>
					{apiUserInfo.cats.map((cat, index) => {
						return (
							<Pressable key={index}>
								<Image
									tw="h-36 w-36 mr-6"
									source={{ uri: cat.cat_img }}
								></Image>
							</Pressable>
						);
					})}
				</ScrollView>
				<View tw="flex-row space-x-4">
					<Pressable
						tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={() => setSignUp(false)}
					>
						<Text tw="text-3xl">Back</Text>
					</Pressable>
					<Pressable
						tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md "
						style={{ elevation: 6 }}
						onPress={signUp}
					>
						<Text tw="text-3xl">Sign Up</Text>
					</Pressable>
				</View>
			</View>
			{addCat ? (
				<AddCat
					setAddCat={setAddCat}
					addCat={addCat}
					setApiUserInfo={setApiUserInfo}
					apiUserInfo={apiUserInfo}
				/>
			) : (
				""
			)}
		</View>
	);
};

export default SignUpScreen;
