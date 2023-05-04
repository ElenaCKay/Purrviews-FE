import React, { useCallback, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Touchable,
	TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";

const auth = getAuth();

export default function HomeScreen() {
	const [galleryPerm, setGalleryPerm] = useState(null);
	const [image, setImage] = useState("");
	const user = auth.currentUser;

	useEffect(() => {
		(async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setGalleryPerm(galleryStatus.status === "granted");
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
		});
		if (!result.canceled) {
			setImage(result.assets[0].base64);
		}
	};
	if (galleryPerm === false) {
		return <Text>No access to storage</Text>;
	}

	return (
		<View tw="h-full">
			<Image
				source={{ uri: "data:image/png;base64," + image }}
				tw="h-80 w-80"
			/>
			<Text>Welcome {user?.email}!</Text>

			<Button title="Upload File" onPress={pickImage} />
			<TouchableOpacity tw="absolute bottom-2 right-2 bg-red-500 w-16 h-16 rounded-3xl justify-center align-middle border-red-300 border-2">
				<Text tw="text-center text-white font-bold text-3xl">+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		marginTop: 10,
	},
});
