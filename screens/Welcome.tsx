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
import fetchFonts from "../utils/hooks/useFonts";
import { getUsersByUsername } from "../api";
import { autoLogin } from "../utils/hooks/autoLogin";
import signOutLocal from "../utils/hooks/signOutLocal";
import { getLocalUser } from "../utils/hooks/getLocalUser";
import { saveUser } from "../utils/hooks/saveUser";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import CatOfTheDay from "../components/CatOfTheDay";

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
					style={{
						fontFamily: "Pacifico-Regular",
						textShadowColor: "white",
						textShadowRadius: 1,
						textShadowOffset: {
							width: 4,
							height: 4,
						},
					}}
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
				<SignUpScreen setSignUp={setSignUp} isLoading={isLoading} />
			) : user ? (
				<View tw="h-4/6 w-full absolute items-center bottom-0">
					<CatOfTheDay />
					<TouchableOpacity
						tw="w-44 h-12 bg-white rounded-md bottom-3 items-center absolute justify-center"
						style={{ elevation: 6 }}
						onPress={() => {
							signOutLocal();
							signOut(auth);
						}}
					>
						<Text tw="text-3xl">Sign Out</Text>
					</TouchableOpacity>
					{local.username && (
						<Text
							tw="text-4xl p-10 text-purple-900"
							style={{
								fontFamily: "Pacifico-Regular",
								fontSize: 40,
								color: "#FFF",
								textShadowColor: "black",
								textShadowRadius: 10,
								textShadowOffset: {
									width: 2,
									height: 2,
								},
							}}
						>
							Welcome {local.username}!{" "}
						</Text>
					)}
				</View>
			) : (
				<SignInScreen setSignUp={setSignUp} LottieRef={LottieRef} />
			)}
		</View>
	);
};

export default WelcomeScreen;
