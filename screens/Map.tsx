import React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, Image, Text } from "react-native";
import usePosts from "../utils/hooks/usePosts";
import { catmarkers } from "../assets/catmarkers/catmarkers";

export default function Map(): JSX.Element {
	const { postsData, isLoading, isError } = usePosts();

	if (isError) return <Text>Something Went Wrong!</Text>;

	return isLoading ? (
		<View>
			<MapView tw="w-full h-full"></MapView>
		</View>
	) : (
		<View>
			<MapView tw="w-full h-full">
				{postsData.map((post) => (
					<Marker
						key={post._id}
						coordinate={{
							latitude: post.lat,
							longitude: post.long,
						}}
					>
						<Image
							source={
								post.img_url
									? { uri: post.img_url }
									: {
											uri: catmarkers[
												Math.floor(Math.random() * catmarkers.length)
											],
									  }
							}
							style={{ width: 35, height: 35, borderRadius: 100 }}
						></Image>
						<Callout tw=" w-60 h-60 content-center bg-orange-200">
							<View tw="absolute w-60 h-60 items-center text-center border-orange-200">
								<Text tw="-top-24 m-0 h-full w-full text-center">
									<Image
										source={
											post.img_url
												? { uri: post.img_url }
												: {
														uri: catmarkers[
															Math.floor(Math.random() * catmarkers.length)
														],
												  }
										}
										style={{ width: 200, height: 200 }}
										resizeMode="cover"
									/>
								</Text>
								<Text tw="-top-24 text-center bg-orange-300 w-5/6">
									{post.description}
								</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
		</View>
	);
}
