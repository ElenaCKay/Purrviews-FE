import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, Image, Text } from "react-native";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import { Svg, Image as ImageSvg } from "react-native-svg";

export default function Map(): JSX.Element {
	return (
		<View>
			<MapView tw="w-full h-full">
				<Marker
					icon={{
						uri: catmarkers[Math.floor(Math.random() * catmarkers.length)],
					}}
					title="ddd"
					coordinate={{
						latitude: 50.6762,
						longitude: 4.6503,
					}}
				>
					<Callout>
						<Image
							source={{ uri: catmarkers[1] }}
							style={{ width: 10, height: 10 }}
						/>

						<Svg width={200} height={120} tw="align-middle justify-center">
							<ImageSvg
								width={"100%"}
								height={"100%"}
								href={{ uri: catmarkers[1] }}
							/>
						</Svg>
						<View>
							<Text>name</Text>
							<Text>age</Text>
							<Text>breed</Text>
							<Text>characteristics</Text>
						</View>
					</Callout>
				</Marker>
				<Marker
					icon={{
						uri: catmarkers[Math.floor(Math.random() * catmarkers.length)],
					}}
					title="ddd"
					coordinate={{
						latitude: 47.6762,
						longitude: 4.6503,
					}}
				/>
				<Marker
					icon={{
						uri: catmarkers[Math.floor(Math.random() * catmarkers.length)],
					}}
					title="ddd"
					coordinate={{
						latitude: 44.6762,
						longitude: 3.6503,
					}}
				></Marker>
			</MapView>
		</View>
	);
}
