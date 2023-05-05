import { getAuth, signOut, updateProfile } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	TouchableOpacity,
	ScrollView,
	Dimensions, 
	 NativeScrollEvent
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { catmarkers } from "../assets/catmarkers/catmarkers";

// &#x25cf; - big dot

const auth = getAuth();
const { width, height } = Dimensions.get("window");

export default function UserScreen() {
	const [galleryPerm, setGalleryPerm] = useState(null);
	const [image, setImage] = useState(catmarkers[1]);
	const [active, setActive] = useState(0);
	const user = auth.currentUser;

	useEffect(() => {
		(async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setGalleryPerm(galleryStatus.status === "granted");
		})();
	}, []);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
		});
		if (!result.canceled) {
			setImage("data:image/png;base64," + result.assets[0].base64);
		}
	};
	if (galleryPerm === false) {
		return <Text>No access to storage</Text>;
	}

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
		<View tw="flex-1 items-center m-3">
			<Text className=" text-3xl font-bold m-3">Welcome {user?.displayName}!</Text>
			<TouchableOpacity onPress={pickImage}>
				<Image source={{ uri: image }} tw="h-72 w-72 rounded-3xl" />
			</TouchableOpacity>
			<Text tw="text-xl mt-3">Cats:</Text>
			<ScrollView
				style={{ width: width, height: height * 0.35 }}
				onScroll={({ nativeEvent }) => onchange(nativeEvent)}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				horizontal
			>
				{catmarkers.map((e, index) => (
					<View
						key={e}
						tw="flex-row align-middle justify-center"
						style={{ width: width }}
					>
						<View tw="flex-col text-center">
							<Image source={{ uri: e }} tw="h-60 w-72" />
							<View>
								<Text tw="text-center">Name:</Text>
								<Text tw="text-center">Age:</Text>
								<Text tw="text-center">Breed:</Text>
								<Text tw="text-center">Characteristics:</Text>
							</View>
						</View>
					</View>
				))}
				<View tw="bottom-0 flex-row align-middle absolute"></View>
			</ScrollView>
			<View tw="flex-row bottom-9 self-center absolute">
				{catmarkers.map((e, index) => (
					<Text
						key={e}
						style={
							active === index
								? { color: "grey", margin: 3 }
								: { color: "black", margin: 3 }
						}
					>
						&#x25cf;
					</Text>
				))}
			</View>
			<Button title="Sign Out" onPress={() => signOut(auth)} />
		</View>
	);
}
