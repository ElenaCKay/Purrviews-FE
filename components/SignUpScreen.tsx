import { useEffect, useState } from "react";
import {
	Text,
	View,
	TextInput,
	ScrollView,
	Image,
	TouchableOpacity,
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
import { postCat, postUser } from "../api";
import AddCat from "./AddCat";
import Animated, { SlideInDown } from "react-native-reanimated";
import { saveUser } from "../utils/hooks/saveUser";

const SignUpScreen = ({ setSignUp, isLoading }) => {
	const [addCat, setAddCat] = useState(false);
	const [active, setActive] = useState(0);
	const [err, setErr] = useState("");
	const auth = getAuth();
	const [firebase, setFirebase] = useState({
		email: "",
		password: "",
		displayName: "",
	});
	const [apiUserInfo, setApiUserInfo] = useState({
		username: "",
		description: "",
		avatar: catmarkers[Math.floor(Math.random() * catmarkers.length)],
		cats: [],
	});

	onchange = (nativeEvent) => {
		if (nativeEvent) {
			const slide = Math.ceil(
				nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
			);
			if (slide !== active) setActive(slide);
		}
	};

	function signUp() {
		if (firebase.email === "" || firebase.password === "")
			setErr("Email and password are mandatory.");
		else
			createUserWithEmailAndPassword(auth, firebase.email, firebase.password)
				.then(() => {
					updateProfile(auth.currentUser, {
						displayName: firebase.displayName,
					});
					saveUser(apiUserInfo);
					postUser(apiUserInfo);
				})
				.then(() =>
					apiUserInfo.cats.forEach((cat) => postCat(apiUserInfo.username, cat))
				)
				.catch((error) => setErr(err + error.message));
	}

	const pickImage = () =>
		ImagePicker.requestMediaLibraryPermissionsAsync().then(() => {
			ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 4],
				base64: true,
				quality: 0.3,
			})
				.then((result) => {
					console.log("Byte Length: " + result.assets[0].base64.length);
					if (result.assets[0].base64.length > 400000)
						setErr("Image size too large");
					else if (!result.canceled)
						setApiUserInfo({
							...apiUserInfo,
							avatar: "data:image/png;base64," + result.assets[0].base64,
						});
				})
				.catch((err) => setErr("failed"));
		});

	return isLoading ? (
		<Splash />
	) : (
		<Animated.View
			entering={SlideInDown}
			tw="flex-1 w-full absolute bottom-0 border-y-2 border-orange-400 bg-orange-300 items-center"
		>
			<ScrollView tw="content-center">
				<Text
					tw={
						err
							? "w-full h-8 bg-red-700 text-xl text-white"
							: '"w-full  h-8 text-xl text-white"'
					}
				>
					{err && err}
				</Text>
				<Text
					style={{ fontFamily: "Pacifico-Regular" }}
					tw="text-center text-5xl pt-4 text-purple-900 underline"
				>
					Sign Up
				</Text>
				<TouchableOpacity
					tw="mb-6 p-2 bg-gray-300 rounded-3xl self-center w-44 h-44"
					style={{ elevation: 6 }}
					onPress={pickImage}
				>
					<Image
						tw="h-44 w-40"
						source={{ uri: apiUserInfo.avatar }}
						resizeMode="contain"
					/>
					<Text tw="text-xl text-gray-500 absolute ">Upload a photo!</Text>
				</TouchableOpacity>
				<Input
					style={{ backgroundColor: "#d7945f" }}
					placeholder="Username"
					value={firebase.displayName && apiUserInfo.username}
					onChangeText={(text) => {
						setApiUserInfo({ ...apiUserInfo, username: text });
						setFirebase({ ...firebase, displayName: text });
					}}
					leftIcon={<Icon name="envelope" size={16} />}
				/>
				<Input
					style={{ backgroundColor: "#d7945f" }}
					placeholder="Email"
					value={firebase.email}
					onChangeText={(text) => setFirebase({ ...firebase, email: text })}
					leftIcon={<Icon name="envelope" size={16} />}
				/>
				<Input
					style={{ backgroundColor: "#d7945f" }}
					placeholder="Password"
					value={firebase.password}
					onChangeText={(text) => setFirebase({ ...firebase, password: text })}
					secureTextEntry={true}
					leftIcon={<Icon name="key" size={16} />}
				/>
				<TextInput
					tw="ml-8 w-full h-16"
					style={{ backgroundColor: "#d7945f" }}
					placeholder="Your Description Here"
					value={apiUserInfo.description}
					onChangeText={(text) =>
						setApiUserInfo({ ...apiUserInfo, description: text })
					}
				/>
				{/* <ScrollView
					tw="mt-4 p-4 w-full text-white"
					style={{ backgroundColor: "#d7945f" }}
					onScroll={({ nativeEvent }) => onchange(nativeEvent)}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					horizontal
				>
					{apiUserInfo.cats.length < 4 && (
						<TouchableOpacity
							tw="h-36  mr-6 w-36 bg-gray-300 rounded-3xl justify-center items-center align-middle"
							style={{ elevation: 6 }}
							onPress={() => setAddCat(!addCat)}
						>
							<Text tw=" text-gray-500 text-4xl absolute z-20 top-0">
								Add Cat
							</Text>
							<Text tw=" text-gray-500 text-4xl absolute z-20 bottom-0">
								(Max 4)
							</Text>
							<Text tw="text-5xl">+</Text>
						</TouchableOpacity>
					)}
					{apiUserInfo.cats.map((cat, index) => {
						return (
							<TouchableOpacity
								tw="h-36 mr-6 w-36 bg-gray-300 rounded-3xl"
								key={index}
							>
								<Image
									tw="h-36 w-36"
									resizeMode="contain"
									source={{ uri: cat.cat_img }}
								/>
							</TouchableOpacity>
						);
					})}
				</ScrollView> */
				/* <View tw="flex-row self-center">
					{apiUserInfo.cats.map((e, index) => (
						<Text
							tw=" -mt-10"
							key={index}
							style={
								active === index
									? { color: "grey", margin: 3 }
									: { color: "black", margin: 3 }
							}
						>
							&#x25cf;
						</Text>
					))}
				</View> */}

				<View tw="flex-row space-x-4">
					<TouchableOpacity
						tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={() => setSignUp(false)}
					>
						<Text tw="text-3xl">Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
						style={{ elevation: 6 }}
						onPress={signUp}
					>
						<Text tw="text-3xl">Sign Up</Text>
					</TouchableOpacity>
				</View>
				{/* {addCat && (
					<AddCat
						setAddCat={setAddCat}
						addCat={addCat}
						setApiUserInfo={setApiUserInfo}
						apiUserInfo={apiUserInfo}
					/>
				)} */}
			</ScrollView>
		</Animated.View>
	);
};

export default SignUpScreen;
