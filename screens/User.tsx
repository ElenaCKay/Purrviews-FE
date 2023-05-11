import { getAuth, signOut, updateProfile } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	NativeScrollEvent,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import useUserProfile from "../utils/hooks/useUserProfile";
import AddCat from "../components/AddCat";
import signOutLocal from "../utils/hooks/signOutLocal";
import Splash from "../components/Splash";

const auth = getAuth();
const { width, height } = Dimensions.get("window");

export default function UserScreen() {
	const [galleryPerm, setGalleryPerm] = useState(null);
	const [image, setImage] = useState(catmarkers[1]);
	const [active, setActive] = useState(0);
	const user = auth.currentUser;
	const username = user.displayName;
	const [addCat, setAddCat] = useState(false);
	const { userProfile, setUserProfile, isError, isLoading } =
		useUserProfile(username);

	useEffect(() => {
		(async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setGalleryPerm(galleryStatus.status === "granted");
		})();
	}, [addCat, userProfile]);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			base64: true,
		});
		if (!result.canceled) {
			setImage("data:image/png;base64," + result.assets[0].base64);
		}
	};

	if (galleryPerm === false) {
		return <Text>No access to storage</Text>;
	}

	if (isError) {
		return <Text>Something Went Wrong!</Text>;
	}

	if (isLoading) return <Splash />;

	const onchange = (nativeEvent: NativeScrollEvent) => {
		const { contentOffset, layoutMeasurement } = nativeEvent;
		if (contentOffset) {
			const slide = Math.ceil(contentOffset.x / layoutMeasurement.width);
			if (slide !== active) {
				setActive(slide);
			}
		}
	};

	return (
		<View tw="flex-1 bg-orange-200 items-center h-full w-full">
			<ScrollView tw="bg-orange-200 w-full">
				<View tw="flex-1 items-center bg-orange-200 h-full w-full">
					<Text
						tw="text-3xl m-3 mt-10 text-center pt-6 text-purple-900 text-5xl underline text-center"
						style={{ fontFamily: "Pacifico-Regular" }}
					>
						Welcome {user?.displayName}!
					</Text>
					<TouchableOpacity onPress={pickImage}>
						<Image
							source={{ uri: userProfile.avatar }}
							tw="h-60 w-60 rounded-3xl"
						/>
					</TouchableOpacity>

					<Text
						tw="text-3xl text-center pt-6 text-purple-900 text-5xl underline text-center"
						style={{ fontFamily: "Pacifico-Regular" }}
					>
						Cats:
					</Text>
					<ScrollView
						style={{ width: width }}
						onScroll={({ nativeEvent }) => onchange(nativeEvent)}
						pagingEnabled
						horizontal
					>
						{userProfile.cats.map((e, index) => (
							<View
								key={index}
								tw="flex-row align-middle justify-center bg-orange-300 pb-2 pt-2 w-full"
								style={{ width: width }}
							>
								<View tw="flex-col items-center text-center rounded-md w-5/6 border-[#876243] border-4  bg-[#d7945f]">
									<Image
										source={{ uri: e.cat_img }}
										tw="bg-gray-300 rounded-md mt-2 mb-2 h-60 w-60"
									/>
									<View tw="bg-[#876243] p-4 w-full">
										<Text tw="text-xl text-orange-200">Name: {e.cat_name}</Text>
										<Text tw="text-xl text-orange-200">Age: {e.age}</Text>
										<Text tw="text-xl text-orange-200">Breed: {e.breed}</Text>
										<Text tw="text-xl text-orange-200">
											Characteristics: {e.characteristics[0]}
										</Text>
									</View>
								</View>
							</View>
						))}
						{userProfile.cats.length < 4 && (
							<View
								tw=" justify-center items-center align-middle bg-orange-300 pb-2 pt-2"
								style={{ width: width }}
							>
								<TouchableOpacity
									tw="h-60 w-60 bg-gray-300 rounded-3xl justify-center items-center align-middle"
									style={{ elevation: 6 }}
									onPress={() => setAddCat(!addCat)}
								>
									<Text tw="text-gray-500 text-4xl absolute top-0">
										Add Cat
									</Text>
									<Text tw="text-gray-500 text-4xl absolute bottom-0">
										(Max 4)
									</Text>
									<Text tw="text-5xl">+</Text>
								</TouchableOpacity>
							</View>
						)}
					</ScrollView>
					{addCat && (
						<AddCat
							setAddCat={setAddCat}
							addCat={addCat}
							setUserProfile={setUserProfile}
						/>
					)}
				</View>
			</ScrollView>
			<TouchableOpacity
				tw="self-center p-2 rounded-md items-center justify-center bg-yellow-500 border-2 bottom-0 absolute"
				onPress={() => {
					signOutLocal();
					signOut(auth);
				}}
			>
				<Text tw="text-xl font-bold">Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
}
