import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function Map() {
	return (
		<View>
			<MapView className="w-full h-full" />
		</View>
	);
}
