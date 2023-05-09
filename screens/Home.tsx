import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAuthentication } from "../utils/useAuthentication";
import { Button } from "react-native-elements";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth();

function HomeScreen() {
		const { user } = useAuthentication();

		return (
			<View style={styles.container}>
				<Text>Welcome {user?.email}!</Text>

				<Button
					title="Sign Out"
					style={styles.button}
					onPress={() => signOut(auth)}
				/>
			</View>
		);
 }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	button: {
		marginTop: 10,
	},
});
