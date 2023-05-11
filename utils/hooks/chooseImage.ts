import * as ImagePicker from "expo-image-picker";

const ChooseImage = async () => {
	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		aspect: [4, 4],
		base64: true,
		quality: 0.3,
	});
	return "data:image/png;base64," + result.assets[0].base64;
};

export default ChooseImage;
