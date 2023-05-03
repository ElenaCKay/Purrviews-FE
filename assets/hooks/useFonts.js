import * as Font from "expo-font";

export default fetchFonts = async () =>
	await Font.loadAsync({
		"Pacifico-Regular": require("../fonts/Pacifico-Regular.ttf"),
	});
