import { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Image,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useAuthentication } from "../utils/useAuthentication";
import Splash from "../components/Splash";
import LottieView from "lottie-react-native";
import SignInScreen from "../components/SignInScreen";
import SignUpScreen from "../components/SignUpScreen";
import fetchFonts from "../assets/hooks/useFonts";
import { getUsersByUsername } from "../api";
import { autoLogin } from "../assets/hooks/autoLogin";
import signOutLocal from "../assets/hooks/signOutLocal";
import { getLocalUser } from "../assets/hooks/getLocalUser";
import { saveUser } from "../assets/hooks/saveUser";
import { catmarkers } from "../assets/catmarkers/catmarkers";

const auth = getAuth();

const WelcomeScreen = () => {
	const LottieRef = useRef(null);
	const [login, setLogin] = useState(false);
	const { user } = useAuthentication();
	const [isSignUp, setSignUp] = useState(false);
	const [err, setErr] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [local, setLocal] = useState({
		username: "",
		description: "",
		avatar: catmarkers[Math.floor(Math.random() * catmarkers.length)],
	});
	console.log(local.username, "local");

	useEffect(() => {
		setIsLoading(true);
		const attemptLogin = !user
			? autoLogin()
			: user
			? user.displayName !== local.username &&
			  !local.username &&
			  getLocalUser()
					.then((data) => setLocal(data))
					.then(
						() =>
							!local.username &&
							getUsersByUsername(user.displayName).then((users) => {
								setLocal(users);
								saveUser(users);
							})
					)
					.catch((err) => setErr(err))
			: Promise.resolve();
		Promise.all([attemptLogin, fetchFonts()]).then(() => {
			setIsLoading(false);
			LottieRef.current?.play();
		});
	}, [user, login]);

	return isLoading ? (
		<Splash />
	) : (
		<View tw="items-center flex-1 h-full bg-orange-200">
			<View tw="items-center top-28">
				<Text
					onPress={() => LottieRef.current?.play()}
					style={{ fontFamily: "Pacifico-Regular" }}
					tw="text-6xl pt-7 z-10 absolute text-purple-900 self-center"
				>
					Purrviews
				</Text>
				<TouchableWithoutFeedback
					onPress={() => {
						LottieRef.current?.play();
					}}
				>
					<LottieView
						ref={LottieRef}
						tw="w-10/12 absolute self-center -top-16"
						source={require("../assets/Lottie/75212-cat-loader.json")}
						loop={isLoading}
						autoPlay={isLoading}
					/>
				</TouchableWithoutFeedback>
			</View>
			{isSignUp ? (
				<SignUpScreen
					setSignUp={setSignUp}
					setIsLoading={setIsLoading}
					isLoading={isLoading}
					setLocal={setLocal}
					setLogin={setLogin}
				/>
			) : user ? (
				<View tw="h-full bottom-0 absolute justify-center  items-center">
					{local.avatar && (
						<Image
							source={{ uri: local.avatar }}
							tw="w-40 h-40"
							resizeMode="contain"
						/>
					)}
					<Text
						tw="text-4xl pt-3 text-purple-900"
						style={{ fontFamily: "Pacifico-Regular" }}
					>
						Welcome {local.username}!
					</Text>
					<TouchableOpacity
						tw="w-3/6 h-10 bg-white rounded-md bottom-3 items-center absolute"
						style={{ elevation: 6 }}
						onPress={() => {
							signOutLocal();
							signOut(auth);
						}}
					>
						<Text tw="text-3xl">Sign Out</Text>
					</TouchableOpacity>
				</View>
			) : (
				<SignInScreen setSignUp={setSignUp} LottieRef={LottieRef} />
			)}
		</View>
	);
};

export default WelcomeScreen;
